import React, { Component } from 'react';
import './index.scss';

export default class SiteMain extends Component {
  render() {
    return <main className="siteMain">{this.props.children}</main>;
  }
}
