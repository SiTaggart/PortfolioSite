import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostFooterList = props => {
  return <ul className={styles.postFooterList}>{props.children}</ul>;
};
PostFooterList.propTypes = {
  children: PropTypes.node
};
export default PostFooterList;
