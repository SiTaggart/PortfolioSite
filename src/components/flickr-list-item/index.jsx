import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const FlickrListItem = ({ children }) => <li className={styles.flickrListItem}>{children}</li>;
FlickrListItem.propTypes = {
  children: PropTypes.node.isRequired,
};
export { FlickrListItem };
