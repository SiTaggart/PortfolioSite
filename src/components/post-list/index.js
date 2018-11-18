import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ClassNames from 'classnames';

import styles from './index.module.scss';

const PostLink = ({ node, title }) => {
  return <Link to={node.fields.slug}>{title}</Link>;
};
PostLink.propTypes = {
  node: PropTypes.object,
  title: PropTypes.string
};

const PostExerpt = ({ node, title }) => {
  return (
    <article className={styles.postsListItemArticle}>
      <h2 className={styles.postsListItemHeading}>
        <PostLink node={node} title={title} />
      </h2>
      <small className={styles.postsListItemDate}>
        {node.frontmatter.date}
      </small>
      <p className={styles.postsListItemExcerpt}>{node.excerpt}</p>
    </article>
  );
};
PostExerpt.propTypes = {
  node: PropTypes.object,
  title: PropTypes.string
};

const PostListItem = ({ node, title }) => {
  return (
    <li className={styles.postsListItem}>
      {node.excerpt ? (
        <PostExerpt node={node} title={title} />
      ) : (
        <PostLink node={node} title={title} />
      )}
    </li>
  );
};
PostListItem.propTypes = {
  node: PropTypes.object,
  title: PropTypes.string
};

const PostList = props => {
  return (
    <ul
      className={ClassNames(`${styles.postsList}`, {
        [`${styles.postsListFullList}`]: props.isFullList
      })}
    >
      {props.children}
    </ul>
  );
};
PostList.propTypes = {
  children: PropTypes.node,
  isFullList: PropTypes.bool
};

export { PostList, PostListItem };
