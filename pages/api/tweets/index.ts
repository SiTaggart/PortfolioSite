import { NextApiRequest, NextApiResponse } from 'next';
import Twit from 'twit';

const t = new Twit({
  consumer_key: process.env.TWITTER_KEY!,
  consumer_secret: process.env.TWITTER_SECRET!,
  access_token: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

module.exports = (req: NextApiRequest, res: NextApiResponse) => {
  t.get('statuses/user_timeline', { count: 1 }, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};
