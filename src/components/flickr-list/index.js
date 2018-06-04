import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class FlickrList extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <ul className="flickrList">{this.props.children}</ul>;
  }
}
