'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('UrlListController', ['$scope', 'Url',
        function ($scope, Url) {
            var urlList = this;

            $scope.newUrl = new Url();

            $scope.updateUrls = function () {
                Url.query(function (data) {
                    $scope.urls = data;
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
