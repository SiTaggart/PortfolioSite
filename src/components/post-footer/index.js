import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostFooter = props => {
  return <footer className={styles.postFooter}>{props.children}</footer>;
};
PostFooter.propTypes = {
  children: PropTypes.node
};
export default PostFooter;
