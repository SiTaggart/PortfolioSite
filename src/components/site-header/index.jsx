import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './index.module.scss';

const SiteHeader = ({ isPost }) => (
  <header
    className={ClassNames(`${styles.header}`, {
      [`${styles.headerPost}`]: isPost,
    })}
  >
    <img
      alt=""
      className={ClassNames(`${styles.headerAvatar}`, {
        [`${styles.headerAvatarPost}`]: isPost,
      })}
      src="https://s.gravatar.com/avatar/68624bd060d9644d2d84d98ce6aaab2d?s=400"
    />
    <h1
      className={ClassNames(`${styles.headerTitle}`, {
        [`${styles.headerTitlePost}`]: isPost,
      })}
    >
      <a href="/">
        Simon Taggart
        <small>User Interface and Accessibility Expert</small>
      </a>
    </h1>
  </header>
);
SiteHeader.propTypes = {
  isPost: PropTypes.bool,
};
SiteHeader.defaultProps = {
  isPost: undefined,
};
export { SiteHeader };
