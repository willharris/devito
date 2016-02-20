'use strict';

/* Directives */

angular.module('myApp.directives', [])
    .directive('appVersion', function (version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    })
    .directive('validShort', function () {
        // TODO could probably solve this more easily with an ng-pattern or somesuch...
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.validShort = function (modelValue, viewValue) {
                    if (/^\//.test(viewValue)) {
                        ctrl.$setValidity('startingSlash', false); // marks the particular cause of failure
                        return false; // marks the validator as failed
                    }

                    if (/^http(s)?:/i.test(viewValue)) {
                        ctrl.$setValidity('httpPrefix', false);
                        return false;
                    }

                    if (/#/.test(viewValue)) {
                        ctrl.$setValidity('hasHash', false);
                        return false;
                    }
                };
            }
        }
    });
