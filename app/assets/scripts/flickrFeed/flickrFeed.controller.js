;(function () {
    'use strict';

    var flickrFeedCtrl = function flickrFeedCtrl($scope, FlickrFeedService) {
        var ctrl = this,
            DESIRED_NUMBER_OF_PHOTOS = 8;

        ctrl.test = 'Hello, World!';

        FlickrFeedService.getFeed()
            .then(handleRemoteData, handleError)
            .finally(FlickrFeedService);

        function handleRemoteData (data) {
            var items = data.items.length;
            data.items.splice(DESIRED_NUMBER_OF_PHOTOS, (items - DESIRED_NUMBER_OF_PHOTOS));
            ctrl.items = data.items;
        }

        function handleError (response) {
            // body...
        }

        function finalThing (argument) {
            // body...
        }
    };

    angular.module('portfolio.flickrFeed.controller', [
            'portfolio.flickrFeed.service'
        ])
        .controller('FlickrFeedCtrl', flickrFeedCtrl);

}());
