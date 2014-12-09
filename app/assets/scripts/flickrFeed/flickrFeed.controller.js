;(function () {
    'use strict';

    var flickrFeedCtrl = function() {
        var ctrl = this;

        ctrl.test = 'Hello, World!';
    };

    angular.module('portfolio.flickrFeed.controller', [])
        .controller('FlickrFeedCtrl', flickrFeedCtrl);

}());
