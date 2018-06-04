import React from 'react';
import { PropTypes } from 'prop-types';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import SiteFooter from '../components/site-footer';

import './index.scss';

class Template extends React.Component {
  render() {
    const { children } = this.props;
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteAuthor = get(this, 'props.data.site.siteMetadata.author');
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    );
    return (
      <React.Fragment>
        <Helmet title={siteTitle}>
          <html lang="en" amp />
          <meta name="author" content={siteAuthor} />
          <meta name="description" content={siteDescription} />
          <meta
            name="google-site-verification"
            content="JjKsqhE3CE1w5tIV8287tRaRlwKnsIzNKJ0Ml7vt-Nk"
          />
        </Helmet>
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

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
  }
`;
