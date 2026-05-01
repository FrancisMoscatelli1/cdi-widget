/**
 * CDI Widget Controller
 * Main controller for the CDI Widget
 */
angular.module('cdiWidget')
    .controller('CdiWidgetController', [
        '$scope', '$interval', '$timeout', 'CdiWidgetService', 'CDI_CONFIG',
        function ($scope, $interval, $timeout, CdiWidgetService, CDI_CONFIG) {

            // ==================== INITIALIZATION ====================

            const vm = this;

            vm.isAuthenticated = false;
            vm.showLoader = false;
            vm.loaderText = '';

            // Alert modal state
            vm.alert = {
                show: false,
                title: '',
                content: ''
            };

            // Widget state
            vm.installationName = '';
            vm.lines = [];
            vm.inputs = [];
            vm.barStatus = {
                // (left container)
                alarm: false,
                fault: false,
                disconnect: false,
                ground: false,
                test: false,
                extinction: false,
                // (right container)
                battery: 0,
                powerSupply: false,
                network: false
            };

            // Cached icon arrays (to prevent infinite digest)
            vm.statusBarIconsLeft = [];
            vm.statusBarIconsRight = [];

            // Previous barStatus to detect changes
            var previousBarStatus = null;

            // Previous lines and inputs to detect changes
            var previousLinesData = null;
            var previousInputsData = null;

            // Buttons state
            vm.buttons = {
                acknowledge: true,
                reset: false,
                test: false
            };

            // Language
            vm.language = vm.language || CDI_CONFIG.DEFAULT_LANGUAGE;

            // ==================== CONFIGURATION ====================

            /**
             * Initialize configuration from attributes
             */
            function initializeConfig() {
                vm.apiDomain = vm.apiDomain || '';
                vm.userId = parseInt(vm.userId || 0);
                vm.userCode = vm.userCode || '';
                vm.language = vm.language || CDI_CONFIG.DEFAULT_LANGUAGE;

                if (vm.apiDomain && vm.userId && vm.userCode) {
                    authenticate();
                }
            }

            /**
             * Authenticate user with the API
             */
            function authenticate() {
                CdiWidgetService.authenticateUser(vm.apiDomain, vm.userId, vm.userCode)
                    .then(function (result) {
                        if (result.success) {
                            vm.isAuthenticated = true;
                            vm.buttons.reset = true; // Enable reset button after successful authentication
                            vm.buttons.test = true; // Enable test button after successful authentication
                            console.log('User authenticated successfully');
                            loadInitialData();
                            startAutoRefresh();
                        } else {
                            showAlert('Error', 'Authentication failed. Invalid credentials.');
                        }
                    })
                    .catch(function (error) {
                        showAlert('Error', 'Authentication error: ' + error.message);
                    });
            }

            // ==================== DATA FETCHING ====================

            /**
             * Load initial data from API
             */
            function loadInitialData() {
                CdiWidgetService.getGeneralConfig(vm.apiDomain)
                    .then(function (config) {
                        if (config && config.cfgGeneral && config.cfgGeneral['NAME']) {
                            vm.installationName = config.cfgGeneral['NAME'];
                        }
                    })
                    .catch(function (error) {
                        console.error('Error loading general config:', error);
                    });

                loadStatusData();
            }

            /**
             * Load bar status data
             */
            function loadStatusData() {
                CdiWidgetService.getBarStatus(vm.apiDomain)
                    .then(function (data) {
                        updateBarStatus(data.barstatus);
                    })
                    .catch(function (error) {
                        console.error('Error loading bar data:', error);
                    });

                CdiWidgetService.getLinesStatus(vm.apiDomain)
                    .then(function (data) {
                        const lines = data['LINEAS'] || []
                            .filter((line) => line.status !== 0); // Filter out normal status lines to reduce API noise
                        const inputs = data['ENTRADAS'] || []
                            .filter((input) => input.status !== 0); // Filter out normal status inputs to reduce API noise

                        // Check if data actually changed
                        if (!hasArrayChanged(previousLinesData, lines) && !hasArrayChanged(previousInputsData, inputs)) {
                            return; // Skip update if nothing changed
                        }

                        // Update arrays only when data changed
                        vm.lines = orderLines(lines);
                        vm.inputs = orderInputs(inputs);

                        // Save current state for next comparison
                        previousLinesData = angular.copy(lines);
                        previousInputsData = angular.copy(inputs);
                    })
                    .catch(function (error) {
                        console.error('Error loading lines data:', error);
                    });
            }

            /**
             * Start auto-refresh interval
             */
            function startAutoRefresh() {
                if (vm.refreshInterval) {
                    $interval.cancel(vm.refreshInterval);
                }

                vm.refreshInterval = $interval(function () {
                    // if (vm.isAuthenticated && !vm.showLoader) {
                    loadStatusData();
                    // }
                }, CDI_CONFIG.POLLING_INTERVAL || 2500);

                $scope.$on('$destroy', function () {
                    if (vm.refreshInterval) {
                        $interval.cancel(vm.refreshInterval);
                    }
                });
            }
            /**
             * Check if widget is properly configured
             */
            vm.isConfigured = function () {
                return vm.apiDomain && vm.userId && vm.userCode;
            };

            /**
             * Helper function to check if arrays have changed
             */
            function hasArrayChanged(previousArray, currentArray) {
                // If no previous data, consider it changed
                if (!previousArray) return true;

                // Check length first (quick check)
                if (previousArray.length !== currentArray.length) return true;

                // Compare each item's relevant properties
                for (var i = 0; i < currentArray.length; i++) {
                    var prev = previousArray[i];
                    var curr = currentArray[i];

                    // Check if any relevant property changed
                    if (prev.number !== curr.number ||
                        prev.status !== curr.status ||
                        prev.enable !== curr.enable ||
                        prev.alias !== curr.alias) {
                        return true;
                    }
                }

                return false; // No changes detected
            }

            // ==================== RENDERING LOGIC ====================

            /**
             * Update bar status icons
             */
            function updateBarStatus(barStatus) {
                vm.barStatus = {
                    // Status indicators (left container)
                    alarm: barStatus['ALARMA'] || false,
                    fault: barStatus['FALLA'] || false,
                    disconnect: barStatus['DESCONEXION'] || false,
                    ground: barStatus['TIERRA'] || false,
                    test: barStatus['TEST'] || false,
                    extinction: barStatus['EXTINCION'] || false,

                    // System indicators (right container)
                    battery: barStatus['BATERIA'] || 0,
                    powerSupply: barStatus['ALIMENTACION'] || false,
                    network: barStatus['RED'] || false
                };

                // Update cached icon arrays
                updateStatusBarIcons();
            }

            /**
             * Update cached icon arrays
             * This prevents infinite digest loops by updating arrays only when values change
             */
            function updateStatusBarIcons() {
                // Check if barStatus actually changed
                if (previousBarStatus &&
                    previousBarStatus.alarm === vm.barStatus.alarm &&
                    previousBarStatus.fault === vm.barStatus.fault &&
                    previousBarStatus.disconnect === vm.barStatus.disconnect &&
                    previousBarStatus.ground === vm.barStatus.ground &&
                    previousBarStatus.test === vm.barStatus.test &&
                    previousBarStatus.extinction === vm.barStatus.extinction &&
                    previousBarStatus.battery === vm.barStatus.battery &&
                    previousBarStatus.powerSupply === vm.barStatus.powerSupply &&
                    previousBarStatus.network === vm.barStatus.network) {
                    // No changes, skip update
                    return;
                }

                // Update left container icons
                vm.statusBarIconsLeft = [];

                if (vm.barStatus.alarm) {
                    vm.statusBarIconsLeft.push({ src: 'assets/icons/bell.svg', alt: 'Alarma' });
                }
                if (vm.barStatus.fault) {
                    vm.statusBarIconsLeft.push({ src: 'assets/icons/fault.svg', alt: 'Falla' });
                }
                if (vm.barStatus.disconnect) {
                    vm.statusBarIconsLeft.push({ src: 'assets/icons/disconnect.svg', alt: 'Desconexión' });
                }
                if (vm.barStatus.ground) {
                    vm.statusBarIconsLeft.push({ src: 'assets/icons/groundconnection.svg', alt: 'Tierra' });
                }
                if (vm.barStatus.test) {
                    vm.statusBarIconsLeft.push({ src: 'assets/icons/test.svg', alt: 'Test' });
                }
                if (vm.barStatus.extinction) {
                    vm.statusBarIconsLeft.push({ src: 'assets/icons/extinction.png', alt: 'Extinción' });
                }

                // Update right container icons
                const battery = vm.barStatus.battery;
                let batteryIcon = 'assets/icons/batteryfault.svg';
                let batteryAlt = 'Batería: Falla';

                if (battery === 100) {
                    batteryIcon = 'assets/icons/battery100.svg';
                    batteryAlt = 'Batería: 100%';
                } else if (battery >= 75) {
                    batteryIcon = 'assets/icons/battery75.svg';
                    batteryAlt = 'Batería: 75%';
                } else if (battery >= 50) {
                    batteryIcon = 'assets/icons/battery50.svg';
                    batteryAlt = 'Batería: 50%';
                } else if (battery <= 25 && battery > 1) {
                    batteryIcon = 'assets/icons/battery25.svg';
                    batteryAlt = 'Batería: 25%';
                }

                const powerIcon = vm.barStatus.powerSupply
                    ? 'assets/icons/powersupplynormal.svg'
                    : 'assets/icons/powersupplyfault.svg';
                const powerAlt = vm.barStatus.powerSupply
                    ? 'Alimentación OK'
                    : 'Falla de alimentación';

                const networkIcon = vm.barStatus.network
                    ? 'assets/icons/networknormal.svg'
                    : 'assets/icons/networkfault.svg';
                const networkAlt = vm.barStatus.network
                    ? 'Red conectada'
                    : 'Red desconectada';

                vm.statusBarIconsRight = [
                    { src: batteryIcon, alt: batteryAlt },
                    { src: powerIcon, alt: powerAlt },
                    { src: networkIcon, alt: networkAlt }
                ];

                // Save current state for next comparison
                previousBarStatus = angular.copy(vm.barStatus);
            }

            /**
             * Get bar color based on status
             */
            vm.getBarColor = function (type, status) {
                if (type === 'line') {
                    switch (status) {
                        case 0: return 'green';
                        case 2: return 'red';
                        case 3: return 'orange';
                        case 4: return 'red';
                        case 6: return 'yellow';
                        case 7: return 'yellow';
                        case 8: return 'yellow';
                        default: return 'green';
                    }
                } else {
                    switch (status) {
                        case 0: return 'green';
                        case 1: return 'red';
                        case 4: return 'red';
                        case 5: return 'yellow';
                        case 8: return 'yellow';
                        case 9: return 'red';
                        case 12: return 'red';
                        default: return 'green';
                    }
                }
            };

            /**
             * Get bar icon path
             */
            vm.getBarIcon = function (type, status) {
                if (type === 'line') {
                    switch (status) {
                        case 0: return 'assets/icons/check.svg';
                        case 2: return 'assets/icons/bell.svg';
                        case 3: return 'assets/icons/bell.svg';
                        case 4: return 'assets/icons/bell.svg';
                        case 6: return 'assets/icons/fault.svg';
                        case 7: return 'assets/icons/fault.svg';
                        case 8: return 'assets/icons/disconnect.svg';
                        default: return 'assets/icons/check.svg';
                    }
                } else {
                    switch (status) {
                        case 0: return 'assets/icons/check.svg';
                        case 1: return 'assets/icons/bell.svg';
                        case 4: return 'assets/icons/bell.svg';
                        case 5: return 'assets/icons/fault.svg';
                        case 8: return 'assets/icons/fault.svg';
                        case 9: return 'assets/icons/bell.svg';
                        case 12: return 'assets/icons/bell.svg';
                        default: return 'assets/icons/check.svg';
                    }
                }
            };

            /**
             * Get bar name (Línea or Entrada)
             */
            vm.getBarName = function (type) {
                if (type === 'input') {
                    return CDI_CONFIG.DICTIONARY.main.bar.input.name[vm.language] || 'Input';
                }
                return CDI_CONFIG.DICTIONARY.main.bar.line.name[vm.language] || 'Line';
            };

            /**
             * Get localized status text
             */
            vm.getStatusText = function (status) {
                return CDI_CONFIG.STATUS_LYE[vm.language][status] || 'Unknown';
            };

            /**
             * Get translation from dictionary
             */
            vm.t = function (path) {
                const keys = path.split('.');
                let value = CDI_CONFIG.DICTIONARY;
                for (let i = 0; i < keys.length; i++) {
                    if (value && value[keys[i]]) {
                        value = value[keys[i]];
                    } else {
                        return path; // Return path if not found
                    }
                }
                // If value has language keys, return the one for current language
                if (value && typeof value === 'object' && value[vm.language]) {
                    return value[vm.language];
                }
                return value;
            };

            /**
             * Order lines by custom priority
             */
            function orderLines(lines) {
                const customOrder = { 2: 0, 3: 1, 4: 2, 6: 3, 7: 4, 8: 5, 0: 6 };
                return angular.copy(lines).sort(function (a, b) {
                    return (customOrder[a.status] ?? 99) - (customOrder[b.status] ?? 99);
                });
            }

            /**
             * Order inputs by custom priority
             */
            function orderInputs(inputs) {
                const customOrder = { 12: 0, 9: 1, 1: 2, 4: 3, 5: 4, 0: 5 };
                return angular.copy(inputs).sort(function (a, b) {
                    return (customOrder[a.status] ?? 99) - (customOrder[b.status] ?? 99);
                });
            }

            /**
             * Check if bar should be displayed
             */
            vm.shouldShowBar = function (bar) {
                return bar.enable === 1;
            };

            // ==================== BUTTON LOGIC ====================

            /**
             * Send acknowledge command
             */
            vm.acknowledge = function () {
                if (!vm.buttons.acknowledge) return;

                vm.showLoader = true;
                vm.loaderText = CDI_CONFIG.DICTIONARY.modals.loader.header[vm.language];

                CdiWidgetService.sendAcknowledge(vm.apiDomain, vm.userId)
                    .then(function (response) {
                        vm.showLoader = false;
                        showAlert(
                            CDI_CONFIG.DICTIONARY.modals.alert.acknowledge.success.header[vm.language],
                            CDI_CONFIG.DICTIONARY.modals.alert.acknowledge.success.content[vm.language]
                        );
                    })
                    .catch(function (error) {
                        vm.showLoader = false;
                        showAlert(
                            CDI_CONFIG.DICTIONARY.modals.alert.acknowledge.error.header[vm.language],
                            CDI_CONFIG.DICTIONARY.modals.alert.acknowledge.error.content[vm.language]
                        );
                    });
            };

            /**
             * Send reset command
             */
            vm.reset = function () {
                if (!vm.buttons.reset) return;

                vm.showLoader = true;
                vm.loaderText = CDI_CONFIG.DICTIONARY.modals.loader.header[vm.language];

                CdiWidgetService.sendReset(vm.apiDomain, vm.userId)
                    .then(function (response) {
                        vm.showLoader = false;
                        showAlert(
                            CDI_CONFIG.DICTIONARY.modals.alert.reset.success.header[vm.language],
                            CDI_CONFIG.DICTIONARY.modals.alert.reset.success.content[vm.language]
                        );
                    })
                    .catch(function (error) {
                        vm.showLoader = false;
                        showAlert(
                            CDI_CONFIG.DICTIONARY.modals.alert.reset.error.header[vm.language],
                            CDI_CONFIG.DICTIONARY.modals.alert.reset.error.content[vm.language]
                        );
                    });
            };

            /**
             * Send test command
             */
            vm.test = function () {
                if (!vm.buttons.test) return;

                vm.showLoader = true;
                vm.loaderText = CDI_CONFIG.DICTIONARY.modals.loader.header[vm.language];

                CdiWidgetService.sendTest(vm.apiDomain, vm.userId)
                    .then(function (response) {
                        vm.showLoader = false;
                        showAlert(
                            CDI_CONFIG.DICTIONARY.modals.alert.test.success.header[vm.language],
                            CDI_CONFIG.DICTIONARY.modals.alert.test.success.content[vm.language]
                        );
                    })
                    .catch(function (error) {
                        vm.showLoader = false;
                        showAlert(
                            CDI_CONFIG.DICTIONARY.modals.alert.test.error.header[vm.language],
                            CDI_CONFIG.DICTIONARY.modals.alert.test.error.content[vm.language]
                        );
                    });
            };

            // ==================== MODAL FUNCTIONS ====================

            /**
             * Show alert modal
             */
            function showAlert(title, content) {
                vm.alert.show = true;
                vm.alert.title = title;
                vm.alert.content = content;
            }

            /**
             * Close alert modal
             */
            vm.closeAlert = function () {
                vm.alert.show = false;
            };

            // ==================== INITIALIZATION ====================

            /**
             * Lifecycle hook: Initialize controller
             */
            vm.$onInit = function () {
                // Initialize icon arrays with default values
                updateStatusBarIcons();

                // Initialize when controller is ready
                initializeConfig();
            };

            // Watch for configuration changes from parent scope (test.html)
            if ($scope.$parent && $scope.$parent.config) {
                $scope.$parent.$watch('config', function (newConfig) {
                    if (newConfig && newConfig.apiDomain) {
                        vm.apiDomain = newConfig.apiDomain;
                        vm.userId = newConfig.userId;
                        vm.userCode = newConfig.userCode;
                        vm.language = newConfig.language;

                        console.log('Configuration updated from parent:', {
                            apiDomain: vm.apiDomain,
                            userId: vm.userId,
                            language: vm.language
                        });

                        if (vm.apiDomain && vm.userId && vm.userCode) {
                            if (!vm.isAuthenticated) {
                                authenticate();
                                loadInitialData();
                            }
                        }
                    }
                }, true);
            }
        }
    ]);

