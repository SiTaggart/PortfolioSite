import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class SiteMain extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <main className="siteMain">{this.props.children}</main>;
  }
}
