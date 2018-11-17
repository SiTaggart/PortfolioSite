import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './index.module.scss';

const HomeSectionHeader = props => {
  return (
    <header
      className={ClassNames(`${styles.homeSectionHeader}`, {
        [`${styles.homeSectionHeaderPix}`]: props.flavour === 'pix'
      })}
    >
      <h2>{props.children}</h2>
    </header>
  );
};
HomeSectionHeader.propTypes = {
  children: PropTypes.node,
  flavour: PropTypes.string
};

const HomeSectionHeaderLink = props => {
  return (
    <a className={`${styles.homeSectionHeaderLink}`} href={props.href}>
      {props.children}
    </a>
  );
};
HomeSectionHeaderLink.propTypes = {
  children: PropTypes.node,
  flavour: PropTypes.string,
  href: PropTypes.string
};

export { HomeSectionHeader, HomeSectionHeaderLink };
