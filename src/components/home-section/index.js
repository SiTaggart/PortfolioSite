import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './index.module.scss';

const HomeSection = props => (
  <section
    className={ClassNames(`${styles.homeSection}`, {
      [`${styles.homeSectionEgo}`]: props.flavour === 'ego',
      [`${styles.homeSectionPix}`]: props.flavour === 'pix',
      [`${styles.homeSectionBlabber}`]: props.flavour === 'blabber',
      [`${styles.homeSectionPosts}`]: props.flavour === 'posts'
    })}
  >
    {props.children}
  </section>
);
HomeSection.propTypes = {
  children: PropTypes.node,
  flavour: PropTypes.string
};
export default HomeSection;
