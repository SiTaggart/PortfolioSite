import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.scss';

export default class SiteMain extends Component {
  static propTypes = {
    children: PropTypes.node,
    isPost: PropTypes.bool
  };

  render() {
    return (
      <main
        className={ClassNames('siteMain', {
          'siteMain--post': this.props.isPost
        })}
      >
        {this.props.children}
      </main>
    );
  }
}
