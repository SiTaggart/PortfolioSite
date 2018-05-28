import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

import TwitterIcon from '../../svg/icons/ic-twitter.svg';
import './index.scss';

export default class TwitterHandle extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="twitterHandle">
        <Icon>
          <TwitterIcon />
        </Icon>
        <span className="twitterHandle-username">{this.props.children}</span>
      </div>
    );
  }
}
