import React, { Component } from 'react';
import Icon from '../icon';

import GithubIcon from '../../svg/icons/ic-github.svg';
import LinkedInIcon from '../../svg/icons/ic-linkedin.svg';
import './index.scss';

export default class FooterLinks extends Component {
  render() {
    return (
      <ul className="footerLinks">
        <li className="footerLink">
          <a href="https://github.com/sitaggart">
            <Icon>
              <GithubIcon />
            </Icon>
            <span className="is-srOnly">Github profile</span>
          </a>
        </li>
        <li className="footerLink">
          <a href="http://au.linkedin.com/in/sitaggart">
            <Icon>
              <LinkedInIcon />
            </Icon>
            <span className="is-srOnly">LinkedIn profile</span>
          </a>
        </li>
        <li className="footerLink">
          <a href="/posts">Blog</a>
        </li>
      </ul>
    );
  }
}
