'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('UrlListController', ['$scope', 'Url',
        function ($scope, Url) {
            var urlList = this;

            $scope.newUrl = new Url();

            $scope.updateUrls = function () {
                Url.query(function (data) {
                    var maxIdx = 0;
                    $scope.urls = data;
                    data.forEach(function (elem, idx) {
                        if (elem.idx > maxIdx) {
                            maxIdx = elem.idx;
                        }
                    });
                    $scope.newUrl.idx = maxIdx + 1;
                });
            };

            urlList.addUrl = function () {
                $scope.newUrl.$save(function () {
                    $scope.updateUrls();
                });
            };

            urlList.deleteUrl = function (shortLink) {
                Url.delete({urlId: shortLink}, function () {
                    $scope.updateUrls();
                });
            };

            $scope.updateUrls();
        }
    ]);
