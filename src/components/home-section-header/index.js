import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './index.scss';

export default class HomeSectionHeader extends Component {
  static propTypes = {
    children: PropTypes.func,
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
