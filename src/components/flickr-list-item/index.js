import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class FlickrListItem extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <li className="flickrList-item">{this.props.children}</li>;
  }
}
