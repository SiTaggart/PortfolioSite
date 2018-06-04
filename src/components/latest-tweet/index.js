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
    fetch('/.netlify/functions/tweets')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('There was a problem getting my lastest tweet.');
        }
      })
      .then(this.setLatestTweet)
      .catch(this.setLatestTweetError);
  };

  getTweetSize = tweet => {
    return TweetUtils.getSizeBasedOnLength(tweet);
  };

  getFormattedTweet = tweet => {
    return TweetUtils.getFormattedTweet(tweet);
  };

  setLatestTweet = data => {
    this.setState({
      formattedTweet: this.getFormattedTweet(data[0].text),
      size: this.getTweetSize(data[0].text)
    });
  };

  setLatestTweetError = err => {
    this.setState({
      formattedTweet: err,
      size: 'small'
    });
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
