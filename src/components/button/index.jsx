import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Button = ({ children, url }) => {
  let ButtonElement;
  if (url) {
    ButtonElement = (
      <a className={styles.button} href={url}>
        {children}
      </a>
    );
  } else {
    ButtonElement = (
      <button className={styles.button} type="button">
        {children}
      </button>
    );
  }
  return ButtonElement;
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export { Button };
