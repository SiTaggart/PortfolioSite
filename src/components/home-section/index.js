import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.scss';

export default class HomeSection extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    flavour: PropTypes.string
  };

  render() {
    const { flavour } = this.props;
    return (
      <section
        className={ClassNames('homeSection', {
          'homeSection--ego': flavour === 'ego',
          'homeSection--pix': flavour === 'pix',
          'homeSection--blabber': flavour === 'blabber',
          'homeSection--posts': flavour === 'posts'
        })}
      >
        {this.props.children}
      </section>
    );
  }
}
