import React from 'react';
import { PropTypes } from 'prop-types';

class Template extends React.Component {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children()}</React.Fragment>;
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
};

export default Template;
