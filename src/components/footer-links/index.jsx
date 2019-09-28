import React from 'react';
import Icon from '../icon';

import GithubIcon from '../../svg/icons/ic-github.svg';
import LinkedInIcon from '../../svg/icons/ic-linkedin.svg';
import styles from './index.module.scss';
import styleUtils from '../../scss/utils/_index.module.scss';

const FooterLinks = () => (
  <ul className={styles.footerLinks}>
    <li className={styles.footerLink}>
      <a href="https://github.com/sitaggart">
        <Icon>
          <GithubIcon />
        </Icon>
        <span className={styleUtils.isSrOnly}>Github profile</span>
      </a>
    </li>
    <li className={styles.footerLink}>
      <a href="http://au.linkedin.com/in/sitaggart">
        <Icon>
          <LinkedInIcon />
        </Icon>
        <span className={styleUtils.isSrOnly}>LinkedIn profile</span>
      </a>
    </li>
    <li className={styles.footerLink}>
      <a href="/posts">Blog</a>
    </li>
  </ul>
);

export default FooterLinks;
