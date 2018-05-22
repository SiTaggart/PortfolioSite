import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import SiteHeader from '../components/site-header';
import SiteMain from '../components/site-main';
import HomeSection from '../components/home-section';
import HomeSectionHeader from '../components/home-section-header';
import Ego from '../components/ego';
import { PostList } from '../components/post-list';

import './index.scss';

class Index extends React.Component {
  static propTypes = {
    data: PropTypes.any
  };

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <React.Fragment>
        <Helmet title={siteTitle} />
        <SiteHeader />
        <SiteMain>
          <Ego>
            <p>
              A <strong>design led</strong> Front-End Engineer, currently
              working as a{' '}
              <strong>
                Senior Front-End Engineer, Accessibility Specialist
              </strong>{' '}
              at <a href="https://twitter.com/SalesforceUX">Salesforce UX</a>. I
              have over <strong>12 years experience</strong> in Web Development
              and Front-End Engineering, specialising in building user
              interfaces for web sites and web applications.
            </p>
            <p>
              Expert in <strong>Rapid Prototyping</strong> and{' '}
              <strong>Semantic and Accessible</strong> interfaces, I lead and
              work with engineering and design teams which are{' '}
              <strong>research led</strong> and <strong>user focused</strong>.
            </p>
            <p>
              Maker of accessibility colour contrast checker:{' '}
              <a href="http://www.aremycoloursaccessible.com">
                Are My Colours Accessible
              </a>
            </p>
            <p>
              Previously <a href="http://www.bigcommerce.com">BigCommerce</a>,{' '}
              <a href="https://www.flippa.com">Flippa</a>,{' '}
              <a href="https://www.sitepoint.com">SitePoint</a>,{' '}
              <a href="http://www.orchard.com.au">Orchard</a> and{' '}
              <a href="http://www.abacusemedia.com/">Abacus e-media</a>.
            </p>
          </Ego>
          <HomeSection flavour="pix">
            <HomeSectionHeader flavour="pix">Flickr</HomeSectionHeader>
          </HomeSection>
          <HomeSection flavour="blabber">
            <HomeSectionHeader flavour="blabber">Twitter</HomeSectionHeader>
          </HomeSection>
          <HomeSection flavour="posts">
            <HomeSectionHeader flavour="posts">Posts</HomeSectionHeader>
            <PostList posts={posts} />
          </HomeSection>
        </SiteMain>
      </React.Fragment>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
