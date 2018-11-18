import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './index.module.scss';

const SiteHeader = props => {
  return (
    <header
      className={ClassNames(`${styles.header}`, {
        [`${styles.headerPost}`]: props.isPost
      })}
    >
      <img
        className={ClassNames(`${styles.headerAvatar}`, {
          [`${styles.headerAvatarPost}`]: props.isPost
        })}
        src="https://s.gravatar.com/avatar/68624bd060d9644d2d84d98ce6aaab2d?s=400"
        alt=""
      />
      <h1
        className={ClassNames(`${styles.headerTitle}`, {
          [`${styles.headerTitlePost}`]: props.isPost
        })}
      >
        <a href="/">
          Simon Taggart
          <small>User Interface and Accessibility Expert</small>
        </a>
      </h1>
    </header>
  );
};
SiteHeader.propTypes = {
  isPost: PropTypes.bool
};
export default SiteHeader;
