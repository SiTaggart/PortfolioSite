import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class PostArticle extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <article className="postArticle">{this.props.children}</article>;
  }
}
