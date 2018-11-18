import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './index.module.scss';

const SiteMain = props => {
  return (
    <main
      className={ClassNames(`${styles.siteMain}`, {
        [`${styles.siteMainPost}`]: props.isPost
      })}
    >
      {props.children}
    </main>
  );
};
SiteMain.propTypes = {
  children: PropTypes.node,
  isPost: PropTypes.bool
};
export default SiteMain;
