;(function () {
    'use strict';

    var flickrFeedCtrl = function flickrFeedCtrl($scope, FlickrFeedService) {
        var ctrl = this,
            DESIRED_NUMBER_OF_PHOTOS = 4;

        ctrl.test = 'Hello, World!';

        FlickrFeedService.getFeed()
            .then(handleRemoteData, handleError)
            .finally(finalThing);

        function handleRemoteData (data) {
            var items = data.items.length;
            data.items.splice(DESIRED_NUMBER_OF_PHOTOS, (items - DESIRED_NUMBER_OF_PHOTOS));
            ctrl.items = data.items;
            swapImageResultion();
        }

        function handleError (response) {
            // body...
        }

        function finalThing (argument) {
            // alert('final');
        }

        function swapImageResultion () {
            var totalImages = ctrl.items.length;
            for (var i = totalImages - 1; i >= 0; i--) {
                ctrl.items[i].media.m = ctrl.items[i].media.m.replace('_m.jpg', '_z.jpg');
            }
        }
    };

    angular.module('portfolio.flickrFeed.controller', [
            'portfolio.flickrFeed.service'
        ])
        .controller('FlickrFeedCtrl', flickrFeedCtrl);

}());
