import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostFooterList = ({ children }) => <ul className={styles.postFooterList}>{children}</ul>;
PostFooterList.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PostFooterList;
