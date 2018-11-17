import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const FlickrList = props => {
  return <ul className={styles.flickrList}>{props.children}</ul>;
};
FlickrList.propTypes = {
  children: PropTypes.node
};
export default FlickrList;
