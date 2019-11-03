import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './index.module.scss';

const HomeSection = ({ children, flavour }) => (
  <section
    className={ClassNames(`${styles.homeSection}`, {
      [`${styles.homeSectionEgo}`]: flavour === 'ego',
      [`${styles.homeSectionPix}`]: flavour === 'pix',
      [`${styles.homeSectionBlabber}`]: flavour === 'blabber',
      [`${styles.homeSectionPosts}`]: flavour === 'posts',
    })}
  >
    {children}
  </section>
);
HomeSection.propTypes = {
  children: PropTypes.node.isRequired,
  flavour: PropTypes.string.isRequired,
};
export { HomeSection };
