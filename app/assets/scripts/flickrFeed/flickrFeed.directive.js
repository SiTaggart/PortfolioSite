;(function () {
    'use strict';

    var flickrFeedDirective = function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'app/assets/scripts/flickrFeed/flickrFeed.tpl.html',
            replace: true,

            link: function(scope) {
                scope.someTest = "something news";
            }
        };
    };

    angular.module('portfolio.flickrFeed.directive', [])
        .directive('flickrfeed', flickrFeedDirective);

}());

