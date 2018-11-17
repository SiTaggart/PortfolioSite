import React from 'react';
import PropTypes from 'prop-types';
import HomeSection from '../home-section';

const Ego = props => {
  return <HomeSection flavour="ego">{props.children}</HomeSection>;
};
Ego.propTypes = {
  children: PropTypes.node
};
export default Ego;
