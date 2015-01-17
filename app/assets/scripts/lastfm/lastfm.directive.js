;(function () {
    'use strict';

    var lastfmDirective = function lastfmDirective ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/assets/scripts/lastfm/lastfm.tpl.html',

            controller: 'LastfmCtrl as lastfmCtrl',

            link: function(scope, element, attr, ctrl) {
            }
        };
    };

    angular.module('portfolio.lastfm.directive', [
            'portfolio.lastfm.controller'
        ])
        .directive('lastfm', lastfmDirective);
}());
