import React from 'react';
import FooterLinks from '../footer-links';
import styles from './index.module.scss';

const SiteFooter = () => {
  return (
    <footer className={styles.siteFooter}>
      <FooterLinks />
    </footer>
  );
};

export default SiteFooter;
