import React from 'react';
import { PropTypes } from 'prop-types';
import SiteFooter from '../components/site-footer';

import './index.scss';

class Template extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {children()}
        <SiteFooter />
      </React.Fragment>
    );
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
};

export default Template;
