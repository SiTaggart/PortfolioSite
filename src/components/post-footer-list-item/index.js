import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './index.module.scss';

const PostFooterListItem = props => {
  return (
    <li
      className={ClassNames(`${styles.postFooterListItem}`, {
        [`${styles.postFooterListItemNext}`]: props.type === 'next'
      })}
    >
      {props.children}
    </li>
  );
};
PostFooterListItem.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string
};
export default PostFooterListItem;
