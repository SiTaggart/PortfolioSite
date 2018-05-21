import React, { Component } from 'react';
import FooterLinks from '../footer-links';
import './index.scss';

export default class SiteFooter extends Component {
  render() {
    return (
      <footer className="siteFooter">
        <FooterLinks />
      </footer>
    );
  }
}
