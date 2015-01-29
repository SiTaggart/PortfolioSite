;(function () {
    'use strict';

    angular.module('portfolio',[
        'portfolio-templates',
        'portfolio.flickrFeed',
        'portfolio.icon',
        'portfolio.lastfm',
        'portfolio.lazyImage',
        'portfolio.tweets'
    ])
        .config(function(svgRootPathProvider) {
            svgRootPathProvider.setRootPath('/svg/icons/');
        });

}());
