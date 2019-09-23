import React from 'react';
import PropTypes from 'prop-types';
import HomeSection from '../home-section';

const Ego = ({ children }) => <HomeSection flavour="ego">{children}</HomeSection>;
Ego.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Ego;
