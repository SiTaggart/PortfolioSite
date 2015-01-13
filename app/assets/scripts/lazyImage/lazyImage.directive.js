;(function () {
    'use strict';

    var lazyImageDirective = function lazyImageDirective () {
        return {
            restrict: 'A',

            link: function(scope, element, attr) {
                element.bind('load', function imageLoad () {
                    // alert('image loaded');
                });
            }
        };
    };

    angular.module('portfolio.lazyImage.directive', [])
        .directive('lazyImage', lazyImageDirective);
}());
