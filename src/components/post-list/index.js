import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import get from 'lodash/get';

import './index.scss';

export class PostListItem extends Component {
  static propTypes = {
    node: PropTypes.object,
    title: PropTypes.string
  };

  render() {
    const { node, title } = this.props;
    return (
      <li className="posts-listItem">
        <Link to={node.fields.slug}>{title}</Link>
      </li>
    );
  }
}

export class PostList extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <ul className="posts-list">{this.props.children}</ul>;
  }
}
