import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './index.scss';

export class HomeSectionHeader extends Component {
  static propTypes = {
    children: PropTypes.node,
    flavour: PropTypes.string
  };

  render() {
    return (
      <header
        className={ClassNames('homeSection-header', {
          'homeSection-header--blabber': this.props.flavour === 'blabber',
          'homeSection-header--posts': this.props.flavour === 'posts',
          'homeSection-header--pix': this.props.flavour === 'pix'
        })}
      >
        {this.props.children}
      </header>
    );
  }
}

export class HomeSectionHeaderLink extends Component {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string
  };

  render() {
    return (
      <a className="homeSection-header-link" href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}
