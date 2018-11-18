import React from 'react';

import styles from './index.module.scss';
import styleUtils from '../../scss/utils/_index.module.scss';

const FlickLogo = () => {
  return (
    <>
      <span className={styles.flickrLogo}>
        <i className={`${styles.flickrLogoDot} ${styles.flickrLogoDotBlue}`} />
        <i className={`${styles.flickrLogoDot} ${styles.flickrLogoDotPink}`} />
      </span>
      <span className={styleUtils.isSrOnly}>Flickr Photos</span>
    </>
  );
};

export default FlickLogo;
