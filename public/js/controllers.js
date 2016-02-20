'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('UrlListController', ['$document', '$scope', '$window', 'Url',
        function ($document, $scope, $window, Url) {
            var urlList = this;

            $scope.newUrl = new Url();

            $scope.focusInput = function () {
                $document.find('input')[0].focus();
            };

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
                $scope.focusInput();
            };

            urlList.addUrl = function () {
                if ($scope.newUrl.$valid) {
                    $scope.newUrl.$save(function () {
                        $scope.updateUrls();
                    });
                    $scope.focusInput();
                }
            };

            urlList.deleteUrl = function (shortLink) {
                var hostUrl = document.getElementById('host_url').innerHTML;
                if ($window.confirm('Users will no longer be able to resolve the URL\n\n' +
                        hostUrl + '/' + shortLink +
                        '\n\nas soon as you click OK!\n\n' +
                        'Do you really want to delete this URL?')) {
                    Url.delete({urlId: shortLink}, function () {
                        $scope.updateUrls();
                    });
                }
                $scope.focusInput();
            };

            $scope.updateUrls();
        }
    ]);
