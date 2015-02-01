;(function () {
    'use strict';

    var lastfmService= function lastfmService ($http, $q) {

        this.getLastfm = getLastfm;

        function getLastfm () {
            var request = $http({
                params: {
                    limit: 1
                },
                url: '/lastfm'
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function handleSuccess (response) {
            return( response.data );
        }

        function handleError (response) {
            if ( !angular.isObject( response.data ) || !response.data.message ) {
                return( $q.reject( 'An unknown error occurred.' ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }

    };

    angular.module('portfolio.lastfm.service', [])
        .service('LastfmService', lastfmService);
}());
