import React from 'react';
import { PropTypes } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import SiteFooter from '../site-footer';

import './index.scss';

const Layout = ({ children }) => (
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
        <Helmet
          defaultTitle={data.site.siteMetadata.title}
          meta={[
            { name: 'author', content: data.site.siteMetadata.author },
            {
              name: 'description',
              content: data.site.siteMetadata.description
            },
            {
              name: 'google-site-verification',
              content: 'JjKsqhE3CE1w5tIV8287tRaRlwKnsIzNKJ0Ml7vt-Nk'
            }
          ]}
        >
          <html lang="en" amp />
        </Helmet>
        {children}
        <SiteFooter />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
