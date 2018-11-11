import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ClassNames from 'classnames';

import './index.scss';

export class PostListItem extends Component {
  static propTypes = {
    node: PropTypes.object,
    title: PropTypes.string
  };

  renderSimpleLink = (node, title) => {
    return <Link to={node.fields.slug}>{title}</Link>;
  };

  renderArticleExerpt = (node, title) => {
    return (
      <article className="posts-listItem-article">
        <h2 className="posts-listItem-heading">
          {this.renderSimpleLink(node, title)}
        </h2>
        <small className="posts-listItem-date">{node.frontmatter.date}</small>
        <p className="posts-listItem-excerpt">{node.excerpt}</p>
      </article>
    );
  };

  render() {
    const { node, title } = this.props;
    return (
      <li className="posts-listItem">
        {node.excerpt
          ? this.renderArticleExerpt(node, title)
          : this.renderSimpleLink(node, title)}
      </li>
    );
  }
}

export class PostList extends Component {
  static propTypes = {
    children: PropTypes.node,
    isFullList: PropTypes.bool
  };

  render() {
    return (
      <ul
        className={ClassNames('posts-list', {
          'posts-list--fullList': this.props.isFullList
        })}
      >
        {this.props.children}
      </ul>
    );
  }
}
