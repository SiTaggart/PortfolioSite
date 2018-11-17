import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Button = props => {
  return props.url ? (
    <a className={styles.button} href={props.url}>
      {props.children}
    </a>
  ) : (
    <button className={styles.button}>{props.children}</button>
  );
};
Button.propTypes = {
  children: PropTypes.string,
  url: PropTypes.string
};
export default Button;
