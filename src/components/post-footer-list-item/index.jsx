import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './index.module.scss';

const PostFooterListItem = ({ children, type }) => (
  <li
    className={ClassNames(`${styles.postFooterListItem}`, {
      [`${styles.postFooterListItemNext}`]: type === 'next',
    })}
  >
    {children}
  </li>
);
PostFooterListItem.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};
export default PostFooterListItem;
