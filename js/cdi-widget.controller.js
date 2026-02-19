/**
 * CDI Widget Controller
 * Main controller for the CDI Widget
 */
angular.module('cdiWidget')
    .controller('CdiWidgetController', [
        '$scope', '$interval', '$timeout', 'CdiWidgetService', 'CDI_CONFIG',
        function ($scope, $interval, $timeout, CdiWidgetService, CDI_CONFIG) {

            // ==================== INITIALIZATION ====================

            $scope.isAuthenticated = false;
            $scope.isLoading = true;
            $scope.showLoader = false;
            $scope.loaderText = '';

            // Alert modal state
            $scope.alert = {
                show: false,
                title: '',
                content: ''
            };

            // Widget state
            $scope.installationName = '';
            $scope.lines = [];
            $scope.inputs = [];
            $scope.barStatus = {
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
            $scope.statusBarIconsLeft = [];
            $scope.statusBarIconsRight = [];

            // Buttons state
            $scope.buttons = {
                acknowledge: true,
                reset: false,
                test: false
            };

            // Language
            $scope.language = $scope.language || CDI_CONFIG.DEFAULT_LANGUAGE;

            // ==================== CONFIGURATION ====================

            /**
             * Initialize configuration from attributes
             */
            function initializeConfig() {
                $scope.apiDomain = $scope.apiDomain || '';
                $scope.userId = parseInt($scope.userId || 0);
                $scope.userCode = $scope.userCode || '';
                $scope.language = $scope.language || CDI_CONFIG.DEFAULT_LANGUAGE;


                console.log('Widget initialized:', {
                    apiDomain: $scope.apiDomain || 'Not set',
                    userId: $scope.userId || 'Not set',
                    hasCode: !!$scope.userCode,
                    language: $scope.language
                });

                if ($scope.apiDomain && $scope.userId && $scope.userCode) {
                    authenticate();
                }
            }

            /**
             * Authenticate user with the API
             */
            function authenticate() {
                CdiWidgetService.authenticateUser($scope.apiDomain, $scope.userId, $scope.userCode)
                    .then(function (result) {
                        console.log(result);

                        if (result.success) {
                            $scope.isAuthenticated = true;
                            $scope.buttons.reset = true; // Enable reset button after successful authentication
                            $scope.buttons.test = true; // Enable test button after successful authentication
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
                $scope.isLoading = true;

                CdiWidgetService.getGeneralConfig($scope.apiDomain)
                    .then(function (config) {
                        if (config && config.cfgGeneral && config.cfgGeneral['NAME']) {
                            $scope.installationName = config.cfgGeneral['NAME'];
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
                CdiWidgetService.getBarStatus($scope.apiDomain)
                    .then(function (data) {
                        updateBarStatus(data.barstatus);
                        // $scope.lines = orderLines(data.lines || []);
                        // $scope.inputs = orderInputs(data.inputs || []);
                        $scope.isLoading = false;
                    })
                    .catch(function (error) {
                        console.error('Error loading bar data:', error);
                        $scope.isLoading = false;
                    });

                CdiWidgetService.getLinesStatus($scope.apiDomain)
                    .then(function (data) {
                        $scope.lines = orderLines(data['LINEAS'] || []);
                        $scope.inputs = orderInputs(data['ENTRADAS'] || []);
                        $scope.isLoading = false;
                    })
                    .catch(function (error) {
                        console.error('Error loading lines data:', error);
                        $scope.isLoading = false;
                    });
            }

            /**
             * Start auto-refresh interval
             */
            function startAutoRefresh() {
                if ($scope.refreshInterval) {
                    $interval.cancel($scope.refreshInterval);
                }

                $scope.refreshInterval = $interval(function () {
                    // if ($scope.isAuthenticated && !$scope.showLoader) {
                    loadStatusData();
                    // }
                }, CDI_CONFIG.POLLING_INTERVAL || 2500);

                $scope.$on('$destroy', function () {
                    if ($scope.refreshInterval) {
                        $interval.cancel($scope.refreshInterval);
                    }
                });
            }
            /**
             * Check if widget is properly configured
             */
            $scope.isConfigured = function () {
                return $scope.apiDomain && $scope.userId && $scope.userCode;
            };
            // ==================== RENDERING LOGIC ====================

            /**
             * Update bar status icons
             */
            function updateBarStatus(barStatus) {
                $scope.barStatus = {
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
                // Update left container icons
                $scope.statusBarIconsLeft = [];

                if ($scope.barStatus.alarm) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/bell.svg', alt: 'Alarma' });
                }
                if ($scope.barStatus.fault) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/fault.svg', alt: 'Falla' });
                }
                if ($scope.barStatus.disconnect) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/disconnect.svg', alt: 'Desconexión' });
                }
                if ($scope.barStatus.ground) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/groundconnection.svg', alt: 'Tierra' });
                }
                if ($scope.barStatus.test) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/test.svg', alt: 'Test' });
                }
                if ($scope.barStatus.extinction) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/extinction.png', alt: 'Extinción' });
                }

                // Update right container icons
                const battery = $scope.barStatus.battery;
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

                const powerIcon = $scope.barStatus.powerSupply
                    ? 'assets/icons/powersupplynormal.svg'
                    : 'assets/icons/powersupplyfault.svg';
                const powerAlt = $scope.barStatus.powerSupply
                    ? 'Alimentación OK'
                    : 'Falla de alimentación';

                const networkIcon = $scope.barStatus.network
                    ? 'assets/icons/networknormal.svg'
                    : 'assets/icons/networkfault.svg';
                const networkAlt = $scope.barStatus.network
                    ? 'Red conectada'
                    : 'Red desconectada';

                $scope.statusBarIconsRight = [
                    { src: batteryIcon, alt: batteryAlt },
                    { src: powerIcon, alt: powerAlt },
                    { src: networkIcon, alt: networkAlt }
                ];
            }

            /**
             * Get bar color based on status
             */
            $scope.getBarColor = function (type, status) {
                if (type === 'line') {
                    const colorMap = {
                        0: 'green', 1: 'red', 2: 'red', 3: 'yellow',
                        4: 'orange', 5: 'red', 6: 'red', 7: 'red',
                        8: 'green', 9: 'orange'
                    };
                    return colorMap[status] || 'green';
                } else {
                    const colorMap = {
                        0: 'green', 1: 'red', 4: 'yellow', 5: 'orange',
                        9: 'orange', 12: 'red'
                    };
                    return colorMap[status] || 'green';
                }
            };

            /**
             * Get bar icon path
             */
            $scope.getBarIcon = function (type, status) {
                const basePath = 'assets/icons/';
                if (type === 'line') {
                    return basePath + 'line.svg';
                } else {
                    return basePath + 'input.svg';
                }
            };

            /**
             * Get bar name (Línea or Entrada)
             */
            $scope.getBarName = function (type) {
                const names = { es: 'Línea', en: 'Line', pt: 'Linha' };
                if (type === 'input') {
                    return { es: 'Entrada', en: 'Input', pt: 'Entrada' }[$scope.language] || 'Input';
                }
                return names[$scope.language] || 'Line';
            };

            /**
             * Get localized status text
             */
            $scope.getStatusText = function (status) {
                return CDI_CONFIG.STATUSES[$scope.language][status] || 'Unknown';
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
            $scope.shouldShowBar = function (bar) {
                return bar.enable === 1;
            };

            // ==================== BUTTON LOGIC ====================

            /**
             * Send acknowledge command
             */
            $scope.acknowledge = function () {
                if (!$scope.buttons.acknowledge) return;

                $scope.showLoader = true;
                $scope.loaderText = 'Enviando ACK...';

                CdiWidgetService.sendAcknowledge($scope.apiDomain, $scope.userId)
                    .then(function (response) {
                        $scope.showLoader = false;
                        showAlert('Éxito', 'Comando ACK enviado correctamente');
                    })
                    .catch(function (error) {
                        $scope.showLoader = false;
                        showAlert('Error', 'Error al enviar ACK: ' + error.message);
                    });
            };

            /**
             * Send reset command
             */
            $scope.reset = function () {
                if (!$scope.buttons.reset) return;

                $scope.showLoader = true;
                $scope.loaderText = 'Iniciando Reset...';

                CdiWidgetService.sendReset($scope.apiDomain, $scope.userId)
                    .then(function (response) {
                        $scope.showLoader = false;
                        showAlert('Éxito', 'Reset iniciado');
                    })
                    .catch(function (error) {
                        $scope.showLoader = false;
                        showAlert('Error', 'Error al resetear: ' + error.message);
                    });
            };

            /**
             * Send test command
             */
            $scope.test = function () {
                if (!$scope.buttons.test) return;

                $scope.showLoader = true;
                $scope.loaderText = 'Ejecutando Test...';

                CdiWidgetService.sendTest($scope.apiDomain, $scope.userId)
                    .then(function (response) {
                        $scope.showLoader = false;
                        showAlert('Éxito', 'Test ejecutado correctamente');
                    })
                    .catch(function (error) {
                        $scope.showLoader = false;
                        showAlert('Error', 'Error al ejecutar test: ' + error.message);
                    });
            };

            // ==================== MODAL FUNCTIONS ====================

            /**
             * Show alert modal
             */
            function showAlert(title, content) {
                $scope.alert.show = true;
                $scope.alert.title = title;
                $scope.alert.content = content;
            }

            /**
             * Close alert modal
             */
            $scope.closeAlert = function () {
                $scope.alert.show = false;
            };

            /**
             * Update cached icon arrays
             * This prevents infinite digest loops by updating arrays only when values change
             */
            function updateStatusBarIcons() {
                // Update left container icons
                $scope.statusBarIconsLeft = [];

                if ($scope.barStatus.alarm) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/bell.svg', alt: 'Alarma' });
                }
                if ($scope.barStatus.fault) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/fault.svg', alt: 'Falla' });
                }
                if ($scope.barStatus.disconnect) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/disconnect.svg', alt: 'Desconexión' });
                }
                if ($scope.barStatus.ground) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/groundconnection.svg', alt: 'Tierra' });
                }
                if ($scope.barStatus.test) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/test.svg', alt: 'Test' });
                }
                if ($scope.barStatus.extinction) {
                    $scope.statusBarIconsLeft.push({ src: 'assets/icons/extinction.png', alt: 'Extinción' });
                }

                // Update right container icons
                const battery = $scope.barStatus.battery;
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

                const powerIcon = $scope.barStatus.powerSupply
                    ? 'assets/icons/powersupplynormal.svg'
                    : 'assets/icons/powersupplyfault.svg';
                const powerAlt = $scope.barStatus.powerSupply
                    ? 'Alimentación OK'
                    : 'Falla de alimentación';

                const networkIcon = $scope.barStatus.network
                    ? 'assets/icons/networknormal.svg'
                    : 'assets/icons/networkfault.svg';
                const networkAlt = $scope.barStatus.network
                    ? 'Red conectada'
                    : 'Red desconectada';

                $scope.statusBarIconsRight = [
                    { src: batteryIcon, alt: batteryAlt },
                    { src: powerIcon, alt: powerAlt },
                    { src: networkIcon, alt: networkAlt }
                ];
            }

            // ==================== INITIALIZATION ====================

            // Initialize icon arrays with default values
            updateStatusBarIcons();

            // Initialize when controller is ready
            initializeConfig();

            // Watch for configuration changes from parent scope (test.html)
            if ($scope.$parent && $scope.$parent.config) {
                $scope.$parent.$watch('config', function (newConfig) {
                    if (newConfig && newConfig.apiDomain) {
                        $scope.apiDomain = newConfig.apiDomain;
                        $scope.userId = newConfig.userId;
                        $scope.userCode = newConfig.userCode;
                        $scope.language = newConfig.language;

                        console.log('Configuration updated from parent:', {
                            apiDomain: $scope.apiDomain,
                            userId: $scope.userId,
                            language: $scope.language
                        });

                        if ($scope.apiDomain && $scope.userId && $scope.userCode) {
                            if (!$scope.isAuthenticated) {
                                authenticate();
                                loadInitialData();
                            }
                        }
                    }
                }, true);
            }
        }
    ]);
