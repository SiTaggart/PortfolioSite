import Twit from 'twit';

const t = new Twit({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

export function handler(event, context, callback) {
  console.log('hello');
  console.log('key', process.env.TWITTER_KEY);
  t.get('statuses/user_timeline', { count: 1 }, function(err, data) {
    console.log('I got somewhere');
    callback(null, {
      statusCode: err ? 500 : 200,
      body: JSON.stringify(data)
    });
  });
}
