import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostFooter = ({ children }) => <footer className={styles.postFooter}>{children}</footer>;
PostFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PostFooter;
