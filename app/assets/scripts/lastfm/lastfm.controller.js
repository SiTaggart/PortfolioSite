;(function () {
    'use strict';

    var lastfmCtrl = function lastfmCtrl ($scope, $sce, LastfmService) {
        var ctrl = this;

        LastfmService.getLastfm()
            .then(handleLastfmData, handleLastfmError)
            .finally(finallyLastfm);

        function handleLastfmData (data) {
            if(!angular.isArray(data.album)) {
                ctrl.topAlbums = [data.album];
            } else {
                ctrl.topAlbums = data.album;
            }
        }

        function handleLastfmError (response) {
            console.log('error', response);
        }

        function finallyLastfm (argument) {
            // console.log('finally');
        }

    };

    angular.module('portfolio.lastfm.controller', [
            'portfolio.lastfm.service'
        ])
        .controller('LastfmCtrl', lastfmCtrl);
}());
