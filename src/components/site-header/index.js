import React, { Component } from 'react';
import './index.scss';

export default class SiteHeader extends Component {
  render() {
    return (
      <header className="header">
        <img
          className="header-avatar"
          src="https://s.gravatar.com/avatar/68624bd060d9644d2d84d98ce6aaab2d?s=400"
          alt=""
        />
        <h1 className="header-title">
          Simon Taggart
          <small>User Interface and Accessibility Expert</small>
        </h1>
      </header>
    );
  }
}
