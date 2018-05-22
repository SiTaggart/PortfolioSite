import React, { Component } from 'react';
import './index.scss';

export default class FooterLinks extends Component {
  render() {
    return (
      <ul className="footerLinks">
        <li className="footerLink">
          <a href="https://github.com/sitaggart">
            <icon glyph="ic-github" />
            <span className="is-srOnly">Github profile</span>
          </a>
        </li>
        <li className="footerLink">
          <a href="http://au.linkedin.com/in/sitaggart">
            <icon glyph="ic-linkedin" />
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
