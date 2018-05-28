import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class Icon extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  renderSVG = () => {
    return React.cloneElement(this.props.children, { className: 'icon' });
  };

  render() {
    return <span className="iconContainer">{this.renderSVG()}</span>;
  }
}
