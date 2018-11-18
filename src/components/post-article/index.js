import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostArticle = props => {
  return <article className={styles.postArticle}>{props.children}</article>;
};
PostArticle.propTypes = {
  children: PropTypes.node
};
export default PostArticle;
