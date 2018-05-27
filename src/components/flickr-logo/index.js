import React, { Component } from 'react';

import './index.scss';

export default class FlickLogo extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="flickrLogo">
          <i className="flickrLogo-dot flickrLogo-dot--blue" />
          <i className="flickrLogo-dot flickrLogo-dot--pink" />
        </span>
        <span className="is-srOnly">Flickr Photos</span>
      </React.Fragment>
    );
  }
}
