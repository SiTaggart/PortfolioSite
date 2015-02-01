;(function () {
    'use strict';

    var flickrFeedDirective = function flickrFeedDirective($rootScope) {
        return {
            restrict: 'A',
            templateUrl: 'app/assets/scripts/flickrFeed/flickrFeed.tpl.html',
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

