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
        <h2>{this.props.children}</h2>
      </header>
    );
  }
}

export class HomeSectionHeaderLink extends Component {
  static propTypes = {
    children: PropTypes.node,
    flavour: PropTypes.string,
    href: PropTypes.string
  };

  render() {
    return (
      <a
        className={ClassNames('homeSection-header-link', {
          'homeSection-header-link--blabber': this.props.flavour === 'blabber'
        })}
        href={this.props.href}
      >
        {this.props.children}
      </a>
    );
  }
}
