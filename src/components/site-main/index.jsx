import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './index.module.scss';

const SiteMain = ({ children, isPost }) => (
  <main
    className={ClassNames(`${styles.siteMain}`, {
      [`${styles.siteMainPost}`]: isPost,
    })}
  >
    {children}
  </main>
);
SiteMain.propTypes = {
  children: PropTypes.node.isRequired,
  isPost: PropTypes.bool,
};
SiteMain.defaultProps = {
  isPost: null,
};
export { SiteMain };
