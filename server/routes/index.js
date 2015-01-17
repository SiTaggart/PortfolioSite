var Twit = require('twit');

var t = new Twit({
    consumer_key:         'XahSZEZkU9KetRqAmk5IIRVU6',
    consumer_secret:      'welYaQfJ3M3W6Ddyft7vdGqjaJfcn3mQVeOfYantooy2MFdh45',
    access_token:         '13522952-wm1lu46u6w4CXtOW4dp9xLpVq6PAznGyx7qKcfuwi',
    access_token_secret:  '4w96BsPUPPxkcTglfNhWkeML7FLsh43eQEUr0q0Yc6yvN'
});

exports.getTweets = function(req, res) {
    t.get('statuses/user_timeline', { count: 1 }, function(err, data, response) {
        res.json(data);
    });
};




var LastfmAPI = require('lastfmapi');

// Create a new instance
var lfm = new LastfmAPI({
    'api_key' : 'c06b090ac6af314bfb71d7d005dfbb8d',
    'secret' : '6efdf483a006566145406f8c0b1b5d9c'
});

exports.getTopAlbum = function(req, res) {
    var params = {
        user: 'si_taggart',
        period: '7day',
        limit: req.query.limit,
        api_key: 'c06b090ac6af314bfb71d7d005dfbb8d'
    };

    lfm.user.getTopAlbums(params, function(err, topAlbums){
        res.json(topAlbums);
    });

};
