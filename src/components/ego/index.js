import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeSection from '../home-section';

import './index.scss';

export default class Ego extends Component {
  static propTypes = {
    children: PropTypes.array
  };

  render() {
    return <HomeSection flavour="ego">{this.props.children}</HomeSection>;
  }
}
