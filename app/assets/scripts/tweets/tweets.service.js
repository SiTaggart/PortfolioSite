;(function () {
    'use strict';

    var tweetsService= function tweetsService ($http, $q) {

        this.getTweets = getTweets;

        function getTweets () {
            var request = $http({
                url: '/tweets'
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

    angular.module('portfolio.tweets.service', [])
        .service('TweetsService', tweetsService);
}());
