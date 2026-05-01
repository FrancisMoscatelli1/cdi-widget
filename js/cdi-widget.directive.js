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
    .directive('cdiWidget', ['$timeout', function ($timeout) {
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
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs, vm) {
                // The properties are already bound to the controller (vm) 
                // due to bindToController: true
                
                console.log('CDI Widget initialized with:', {
                    apiDomain: vm.apiDomain,
                    userId: vm.userId,
                    userCode: vm.userCode,
                    language: vm.language
                });
            }
        };
    }]);
