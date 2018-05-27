import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.string,
    url: PropTypes.string
  };

  render() {
    return this.props.url ? (
      <a className="button" href={this.props.url}>
        {this.props.children}
      </a>
    ) : (
      <button className="button">{this.props.children}</button>
    );
  }
}
