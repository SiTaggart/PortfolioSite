;(function () {
    'use strict';

    var flickrFeedDirective = function flickrFeedDirective($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'app/assets/scripts/flickrFeed/flickrFeed.tpl.html',
            replace: true,
            controller: 'FlickrFeedCtrl as flickrFeedCtrl',

            link: function(scope, element, attr, ctrl) {
                scope.someTest = "something news";
            }
        };
    };

    angular.module('portfolio.flickrFeed.directive', [
            'portfolio.flickrFeed.controller'
        ])
        .directive('flickrfeed', flickrFeedDirective);

}());

