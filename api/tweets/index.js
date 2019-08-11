import Twit from 'twit';

const t = new Twit({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

module.exports = (req, res) => {
  t.get('statuses/user_timeline', { count: 1 }, function(err, data) {
    res.status(err ? 500 : 200).json(data);
  });
};
