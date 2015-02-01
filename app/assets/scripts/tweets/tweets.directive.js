;(function () {
    'use strict';

    var tweetsDirective = function tweetsDirective ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/assets/scripts/tweets/tweets.tpl.html',

            controller: 'TweetsCtrl as tweetsCtrl',

            link: function(scope, element, attr, ctrl) {
            }
        };
    };

    angular.module('portfolio.tweets.directive', [
            'portfolio.tweets.controller'
        ])
        .directive('tweets', tweetsDirective);
}());
