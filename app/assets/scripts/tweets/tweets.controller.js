;(function () {
    'use strict';

    var tweetsCtrl = function tweetsCtrl ($scope, $sce, TweetsService) {
        var ctrl = this;

        TweetsService.getTweets()
            .then(handleTweetData, handleTweetError)
            .finally(finallyTweets);

        function handleTweetData (data) {
            ctrl.tweets = $sce.trustAsHtml(twitterLinks(data[0].text));
        }

        function handleTweetError (response) {
            console.log('error', response);
        }

        function finallyTweets (argument) {
            // console.log('finally');
        }

        function twitterLinks(text) {
            var base_url = 'http://twitter.com/';   // identica: 'http://identi.ca/'
            var hashtag_part = 'search?q=#';        // identica: 'tag/'
            // convert URLs into links
            text = text.replace(
                /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
                function($0, $1, $2) {
                    return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
                });
            // convert protocol-less URLs into links
            text = text.replace(
                /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
                function($0, $1, $2) {
                    return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
                });
            // convert @mentions into follow links
            text = text.replace(
                /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
                function($0, $1, $2, $3) {
                    return ($1 ? $0 : '<a href="' + base_url + $3
                        + '" title="Follow ' + $3 + '" target="_blank">@' + $3
                        + '</a>');
                });
            // convert #hashtags into tag search links
            text = text.replace(
                /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
                function($0, $1, $2, $3) {
                    return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3
                        + '" title="Search tag: ' + $3 + '" target="_blank">#' + $3
                        + '</a>');
                });
            return text;
        }

    };

    angular.module('portfolio.tweets.controller', [
            'portfolio.tweets.service'
        ])
        .controller('TweetsCtrl', tweetsCtrl);
}());
