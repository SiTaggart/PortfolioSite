import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const FlickrList = ({ children }) => <ul className={styles.flickrList}>{children}</ul>;
FlickrList.propTypes = {
  children: PropTypes.node.isRequired,
};
export { FlickrList };
