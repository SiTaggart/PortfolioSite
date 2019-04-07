import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostHeader = props => {
  return <header className={styles.postHeader}>{props.children}</header>;
};
PostHeader.propTypes = {
  children: PropTypes.node
};

const PostHeaderHeading = props => {
  return <h1 className={styles.postHeaderHeading}>{props.children}</h1>;
};
PostHeaderHeading.propTypes = {
  children: PropTypes.node
};

const PostHeaderDate = props => {
  return <p className={styles.postHeaderDate}>{props.children}</p>;
};
PostHeaderDate.propTypes = {
  children: PropTypes.node
};

export { PostHeader, PostHeaderHeading, PostHeaderDate };
