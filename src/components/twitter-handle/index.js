import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

import TwitterIcon from '../../svg/icons/ic-twitter.svg';
import styles from './index.module.scss';

const TwitterHandle = props => {
  return (
    <div className={styles.twitterHandle}>
      <Icon>
        <TwitterIcon />
      </Icon>
      <span className={styles.twitterHandleUsername}>{props.children}</span>
    </div>
  );
};
TwitterHandle.propTypes = {
  children: PropTypes.node
};
export default TwitterHandle;
