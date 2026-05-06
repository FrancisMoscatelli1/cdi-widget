/**
 * CDI Widget Component
 * Modern AngularJS component for the CDI Widget
 */
angular.module('cdiService')
    .component('cdiWidget', {
        templateUrl: 'templates/cdi-widget.html',
        bindings: {
            apiDomain: '@',
            userId: '@',
            userCode: '@',
            language: '@'
        },
        controller: 'CdiWidgetController',
        controllerAs: 'vm'
    });
