import React, { Component } from 'react';
import TweetUtils from '../../utils/tweets';

import './index.scss';

export default class LatestTweet extends Component {
  state = {
    formattedTweet: '',
    size: ''
  };

  componentDidMount() {
    this.getLatestTweet();
  }

  getLatestTweet = () => {
    const tweet =
      'RT @MarcoInEnglish: www.twiitter.com JAWS users: Firefox #HashTags';
    this.setState({
      formattedTweet: this.getFormattedTweet(tweet),
      size: this.getTweetSize(tweet)
    });
  };

  getTweetSize = tweet => {
    return TweetUtils.getSizeBasedOnLength(tweet);
  };

  getFormattedTweet = tweet => {
    return TweetUtils.getFormattedTweet(tweet);
  };

  render() {
    const createFormattedTweet = () => {
      return {
        __html: this.state.formattedTweet
      };
    };
    return (
      <div className={`latestTweet latestTweet--${this.state.size}`}>
        <p dangerouslySetInnerHTML={createFormattedTweet()} />
      </div>
    );
  }
}
