import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class PostFooterList extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <ul className="postFooter-list">{this.props.children}</ul>;
  }
}
