import Twit from 'twit';

const t = new Twit({
  consumer_key: process.env.twitterKey,
  consumer_secret: process.env.twitterSecret,
  access_token: process.env.twitterToken,
  access_token_secret: process.env.twitterTokenSecret
});

export function handler(event, context, callback) {
  t.get('statuses/user_timeline', { count: 1 }, function(err, data) {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: JSON.stringify(data)
    });
  });
}
