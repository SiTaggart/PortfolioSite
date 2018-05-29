import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

import './index.scss';

export default class FlickrFigure extends Component {
  static propTypes = {
    image: PropTypes.object
  };

  getBetterImageURL = url => {
    return url.replace('_m.jpg', '_z.jpg');
  };

  render() {
    const { image } = this.props;
    const imageStyle = {
      backgroundImage: `url(${this.getBetterImageURL(image.media.m)})`
    };
    console.log(image.link);
    return (
      <figure className="flickrFigure">
        <a className="flickrFigure-link" href={image.link}>
          <div className="flickrFigure-image" style={imageStyle} />
          <figcaption className="flickrFigure-title">
            <div className="flickrFigure-title-content">
              {image.title !== '' &&
                image.title !== 'Photo' && <p>{image.title}</p>}
              <span className="button">View on Flickr</span>
            </div>
          </figcaption>
        </a>
      </figure>
    );
  }
}
