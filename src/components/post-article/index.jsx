import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PostArticle = ({ children }) => <article className={styles.postArticle}>{children}</article>;
PostArticle.propTypes = {
  children: PropTypes.node.isRequired,
};
export { PostArticle };
