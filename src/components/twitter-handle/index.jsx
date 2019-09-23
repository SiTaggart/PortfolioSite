import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

import TwitterIcon from '../../svg/icons/ic-twitter.svg';
import styles from './index.module.scss';

const TwitterHandle = ({ children }) => (
  <div className={styles.twitterHandle}>
    <Icon>
      <TwitterIcon />
    </Icon>
    <span className={styles.twitterHandleUsername}>{children}</span>
  </div>
);
TwitterHandle.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TwitterHandle;
