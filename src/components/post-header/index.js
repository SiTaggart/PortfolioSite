import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export class PostHeader extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <header className="postHeader">{this.props.children}</header>;
  }
}

export class PostHeaderHeading extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <h1 className="postHeader-heading">{this.props.children}</h1>;
  }
}

export class PostHeaderDate extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <p className="postHeader-date">{this.props.children}</p>;
  }
}
