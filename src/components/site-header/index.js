import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.scss';

export default class SiteHeader extends Component {
  static propTypes = {
    isPost: PropTypes.bool
  };

  render() {
    return (
      <header
        className={ClassNames('header', {
          'header--post': this.props.isPost
        })}
      >
        <img
          className={ClassNames('header-avatar', {
            'header-avatar--post': this.props.isPost
          })}
          src="https://s.gravatar.com/avatar/68624bd060d9644d2d84d98ce6aaab2d?s=400"
          alt=""
        />
        <h1
          className={ClassNames('header-title', {
            'header-title--post': this.props.isPost
          })}
        >
          <a href="/">
            Simon Taggart
            <small>User Interface and Accessibility Expert</small>
          </a>
        </h1>
      </header>
    );
  }
}
