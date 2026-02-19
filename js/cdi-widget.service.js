/**
 * CDI Widget API Service
 * Handles all API calls to the backend
 * Falls back to mock data if available (for testing)
 */
angular.module('cdiWidget')
    .service('CdiWidgetService', ['$http', '$q', '$timeout', function($http, $q, $timeout) {
            
        return {
            /**
             * Authenticate user with API
             */
            authenticateUser: function(apiDomain, userId, userCode) {
                return $http.get(apiDomain + '/api/config/usuarios', {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(function(response) {
                    try {
                        const users = JSON.parse(atob(response.data.USR));
                        const user = users.find(u => u.id === userId && u.code === userCode);
                        return user ? { success: true, user: user } : { success: false };
                    } catch (e) {
                        console.error('Authentication parse error:', e);
                        return { success: false };
                    }
                })
                .catch(function(error) {
                    console.error('Authentication error:', error);
                    return $q.reject(error);
                });
            },

            /**
             * Fetch bar status
             */
            getBarStatus: function(apiDomain) {
                return $http.get(apiDomain + '/api/barstatus')
                    .then(function(response) { return response.data; })
                    .catch(function(error) {
                        console.error('Bar status error:', error);
                        return $q.reject(error);
                    });
            },

            /**
             * Fetch lines and inputs
             */
            getLinesStatus: function(apiDomain) {
                return $http.get(apiDomain + '/api/linesstatus')
                    .then(function(response) { return response.data; })
                    .catch(function(error) {
                        console.error('Lines status error:', error);
                        return $q.reject(error);
                    });
            },

            /**
             * Fetch installation name and general config
             */
            getGeneralConfig: function(apiDomain) {
                return $http.get(apiDomain + '/api/config/general')
                    .then(function(response) { 
                            
                        return response.data; 
                    })
                    .catch(function(error) {
                        console.error('Config error:', error);
                        return $q.reject(error);
                    });
            },

            /**
             * Send acknowledge command
             */
            sendAcknowledge: function(apiDomain, userId) {
                return $http.post(apiDomain + '/api/cmd', {
                    cmdACK: { userId: userId }
                })
                .then(function(response) { return response.data; })
                .catch(function(error) {
                    console.error('Acknowledge error:', error);
                    return $q.reject(error);
                });
            },

            /**
             * Send reset command
             */
            sendReset: function(apiDomain, userId) {
                return $http.post(apiDomain + '/api/cmd', {
                    cmdReset: { userId: userId }
                })
                .then(function(response) { return response.data; })
                .catch(function(error) {
                    console.error('Reset error:', error);
                    return $q.reject(error);
                });
            },

            /**
             * Send test command
             */
            sendTest: function(apiDomain, userId) {
                return $http.post(apiDomain + '/api/cmd', {
                    cmdTest: { userId: userId }
                })
                .then(function(response) { return response.data; })
                .catch(function(error) {
                    console.error('Test error:', error);
                    return $q.reject(error);
                });
            }
        };
    }]);
