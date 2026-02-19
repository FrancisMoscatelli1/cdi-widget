/**
 * CDI Widget Directive
 * Allows using the widget as a custom HTML element
 * 
 * Usage:
 * <cdi-widget 
 *     api-domain="http://api.ejemplo.com"
 *     user-id="123"
 *     user-code="abc123"
 *     language="es">
 * </cdi-widget>
 */
angular.module('cdiWidget')
    .directive('cdiWidget', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'templates/cdi-widget.html',
            scope: {
                apiDomain: '@',
                userId: '@',
                userCode: '@',
                language: '@'
            },
            controller: 'CdiWidgetController',
            link: function(scope, element, attrs) {
                // Convert userId to integer if provided
                if (attrs.userId) {
                    scope.userId = parseInt(attrs.userId);
                }
                
                // Set default values from attributes
                scope.language = scope.language || 'es';
                
                console.log('CDI Widget directive initialized with:', {
                    apiDomain: scope.apiDomain,
                    userId: scope.userId,
                    userCode: scope.userCode,
                    language: scope.language
                });
            }
        };
    }]);
