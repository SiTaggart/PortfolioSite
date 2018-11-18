import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const FlickrListItem = props => {
  return <li className={styles.flickrListItem}>{props.children}</li>;
};
FlickrListItem.propTypes = {
  children: PropTypes.node
};
export default FlickrListItem;
