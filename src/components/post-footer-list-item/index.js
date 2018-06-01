import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './index.scss';

export default class PostFooterListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string
  };

  render() {
    return (
      <li
        className={ClassNames('postFooter-list-item', {
          'postFooter-list-item--previous': this.props.type === 'previous',
          'postFooter-list-item--next': this.props.type === 'next'
        })}
      >
        {this.props.children}
      </li>
    );
  }
}
