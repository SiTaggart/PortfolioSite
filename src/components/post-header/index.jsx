import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostHeader = ({ children }) => <header className={styles.postHeader}>{children}</header>;
PostHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

const PostHeaderHeading = ({ children }) => (
  <h1 className={styles.postHeaderHeading}>{children}</h1>
);
PostHeaderHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

const PostHeaderDate = ({ children }) => <p className={styles.postHeaderDate}>{children}</p>;
PostHeaderDate.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PostHeader, PostHeaderHeading, PostHeaderDate };
