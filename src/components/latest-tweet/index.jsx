import React, { Component } from 'react';
import toSentenceCase from 'to-sentence-case';
import { getFormattedTweet, getSizeBasedOnLength } from '../../utils/tweets';

import styles from './index.module.scss';

export class LatestTweet extends Component {
  constructor() {
    super();
    this.state = {
      formattedTweet: '',
      size: '',
    };
  }

  componentDidMount() {
    this.getLatestTweet();
  }

  createFormattedTweet = () => {
    const { formattedTweet } = this.state;
    return {
      __html: formattedTweet,
    };
  };

  getLatestTweet = () => {
    fetch('/api/tweets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('There was a problem getting my lastest tweet.');
        } else {
          return response.json();
        }
      })
      .then(this.setLatestTweet)
      .catch(this.setLatestTweetError);
  };

  getTweetSize = (tweet) => getSizeBasedOnLength(tweet);

  getFormattedTweet = (tweet) => getFormattedTweet(tweet);

  getSizeClassName = (size) => {
    const sizeClass = `latestTweet${toSentenceCase(size)}`;
    return styles[sizeClass];
  };

  setLatestTweet = (data) => {
    this.setState({
      formattedTweet: this.getFormattedTweet(data[0].text),
      size: this.getTweetSize(data[0].text),
    });
  };

  setLatestTweetError = (err) => {
    this.setState({
      formattedTweet: err,
      size: 'small',
    });
  };

  render() {
    const { size } = this.state;
    return (
      <div className={`${styles.latestTweet} ${this.getSizeClassName(size)}`}>
        <p dangerouslySetInnerHTML={this.createFormattedTweet()} />
      </div>
    );
  }
}
