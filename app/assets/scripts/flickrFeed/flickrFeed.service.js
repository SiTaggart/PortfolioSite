;(function () {
    'use strict';

    var flickrFeedService =function flickrFeedService ($http, $q) {

        this.getFeed = getFeed;

        function getFeed () {
            var request = $http({
                method: 'JSONP',
                url: 'http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=JSON_CALLBACK&id=51539284@N00#'
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function handleSuccess( response ) {
            return( response.data );
        }

        function handleError( response ) {
            if ( !angular.isObject( response.data ) || !response.data.message ) {
                return( $q.reject( 'An unknown error occurred.' ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }

    };

    angular.module('portfolio.flickrFeed.service', [])
            .service('FlickrFeedService', flickrFeedService);

}());
