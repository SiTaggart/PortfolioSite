var Twit = require('twit');

var t = new Twit({
    consumer_key:         process.env.twitterKey,
    consumer_secret:      process.env.twitterSecret,
    access_token:         process.env.twitterToken,
    access_token_secret:  process.env.twitterTokenSecret
});

exports.getTweets = function(req, res) {
    t.get('statuses/user_timeline', { count: 1 }, function(err, data, response) {
        res.json(data);
    });
};




var LastfmAPI = require('lastfmapi');

// Create a new instance
var lfm = new LastfmAPI({
    'api_key' : process.env.lastfmKey,
    'secret' : process.env.lastfmSecret
});

exports.getTopAlbum = function(req, res) {
    var params = {
        user: 'si_taggart',
        period: '7day',
        // period: '1month',
        limit: req.query.limit,
        api_key: process.env.lastfmKey
    };

    lfm.user.getTopAlbums(params, function(err, topAlbums){
        res.json(topAlbums);
    });

};
