import React from 'react';
import { PropTypes } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import SiteFooter from '../site-footer';

import './index.scss';

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
                author
                description
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet defaultTitle={data.site.siteMetadata.title}>
              <html lang="en" amp />
              <meta name="author" content={data.site.siteMetadata.author} />
              <meta
                name="description"
                content={data.site.siteMetadata.description}
              />
              <meta
                name="google-site-verification"
                content="JjKsqhE3CE1w5tIV8287tRaRlwKnsIzNKJ0Ml7vt-Nk"
              />
            </Helmet>
            {children}
            <SiteFooter />
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
};

export default Layout;
