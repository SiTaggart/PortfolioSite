import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class PostFooter extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <footer className="postFooter">{this.props.children}</footer>;
  }
}
