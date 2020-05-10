import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './index.module.scss';

const HomeSectionHeader = ({ children, flavour }) => (
  <header
    className={ClassNames(`${styles.homeSectionHeader}`, {
      [`${styles.homeSectionHeaderPix}`]: flavour === 'pix',
    })}
  >
    <h2>{children}</h2>
  </header>
);
HomeSectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  flavour: PropTypes.string,
};
HomeSectionHeader.defaultProps = {
  flavour: undefined,
};

const HomeSectionHeaderLink = ({ children, href }) => (
  <a className={`${styles.homeSectionHeaderLink}`} href={href}>
    {children}
  </a>
);
HomeSectionHeaderLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export { HomeSectionHeader, HomeSectionHeaderLink };
