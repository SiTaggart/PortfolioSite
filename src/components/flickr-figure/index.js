import React, { Component } from 'react';
import PropTypes from 'prop-types';

import buttonStyles from '../button/index.module.scss';
import styles from './index.module.scss';

const FlickrFigure = props => {
  const getBetterImageURL = url => {
    return url.replace('_m.jpg', '_z.jpg');
  };

  const { image } = props;

  const imageStyle = {
    backgroundImage: `url(${getBetterImageURL(image.media.m)})`
  };

  return (
    <figure>
      <a className={styles.flickrFigureLink} href={image.link}>
        <div className={styles.flickrFigureImage} style={imageStyle} />
        <figcaption className={styles.flickrFigureTitle}>
          <div className={styles.flickrFigureTitleContent}>
            {image.title !== '' && image.title !== 'Photo' && (
              <p>{image.title}</p>
            )}
            <span className={buttonStyles.button}>View on Flickr</span>
          </div>
        </figcaption>
      </a>
    </figure>
  );
};
FlickrFigure.propTypes = {
  image: PropTypes.object
};
export default FlickrFigure;
