import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ClassNames from 'classnames';

import styles from './index.module.scss';

const PostLink = ({ node, title }) => <Link to={node.fields.slug}>{title}</Link>;
PostLink.propTypes = {
  node: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
};

const PostExerpt = ({ node, title }) => (
  <article className={styles.postsListItemArticle}>
    <h2 className={styles.postsListItemHeading}>
      <PostLink node={node} title={title} />
    </h2>
    <small className={styles.postsListItemDate}>{node.frontmatter.date}</small>
    <p className={styles.postsListItemExcerpt}>{node.excerpt}</p>
  </article>
);
PostExerpt.propTypes = {
  node: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string,
    }),
    excerpt: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

const PostListItem = ({ node, title }) => (
  <li className={styles.postsListItem}>
    {node.excerpt ? (
      <PostExerpt node={node} title={title} />
    ) : (
      <PostLink node={node} title={title} />
    )}
  </li>
);
PostListItem.propTypes = {
  node: PropTypes.shape({
    excerpt: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

const PostList = ({ children, isFullList }) => (
  <ul
    className={ClassNames(`${styles.postsList}`, {
      [`${styles.postsListFullList}`]: isFullList,
    })}
  >
    {children}
  </ul>
);
PostList.propTypes = {
  children: PropTypes.node.isRequired,
  isFullList: PropTypes.bool,
};
PostList.defaultProps = {
  isFullList: null,
};

export { PostList, PostListItem };
