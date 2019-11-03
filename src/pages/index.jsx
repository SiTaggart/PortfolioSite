import React from 'react';
import { uid } from 'react-uid';
import get from 'lodash/get';
import fetchJsonp from 'fetch-jsonp';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { SiteHeader } from '../components/site-header';
import { SiteMain } from '../components/site-main';
import { HomeSection } from '../components/home-section';
import { HomeSectionHeader, HomeSectionHeaderLink } from '../components/home-section-header';
import { FlickrLogo } from '../components/flickr-logo';
import { Ego } from '../components/ego';
import { PostList, PostListItem } from '../components/post-list';
import { FlickrList } from '../components/flickr-list';
import { FlickrListItem } from '../components/flickr-list-item';
import { FlickrFigure } from '../components/flickr-figure';
import { TwitterHandle } from '../components/twitter-handle';
import { LatestTweet } from '../components/latest-tweet';

import styleUtils from '../scss/utils/_index.module.scss';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      flickIsLoading: true,
      flickrPosts: [],
    };
  }

  componentDidMount() {
    this.getflickrFeed();
  }

  getflickrFeed() {
    fetchJsonp(
      'https://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=JSON_CALLBACK&id=51539284@N00#',
      { jsonpCallbackFunction: 'JSON_CALLBACK' }
    )
      .then(response => response.json())
      .then(this.handleData)
      .catch(error => {
        this.setState({
          flickIsLoading: false,
          error,
        });
      });
  }

  handleData = data => {
    const firstFour = data.items.slice(0, 4);
    this.setState({
      flickIsLoading: false,
      flickrPosts: firstFour,
    });
  };

  renderFlickrList() {
    const { error, flickrPosts, flickIsLoading } = this.state;

    if (flickIsLoading) {
      return 'loading';
    }
    if (error) {
      return 'error loading flickr feed';
    }
    return (
      <FlickrList>
        {flickrPosts.map(item => (
          <FlickrListItem key={`flickrListItem${uid(item)}`}>
            <FlickrFigure image={item} />
          </FlickrListItem>
        ))}
      </FlickrList>
    );
  }

  render() {
    const jobTitle = get(this, 'props.data.site.siteMetadata.jobTitle');
    const companyName = get(this, 'props.data.site.siteMetadata.company');
    const companyURL = get(this, 'props.data.site.siteMetadata.companyURL');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout>
        <SiteHeader />
        <SiteMain>
          <Ego>
            <p>
              A <strong>design led</strong> Front-End Engineer currently working as a{' '}
              <strong>{jobTitle}</strong> at <a href={companyURL}>{companyName}</a>, on Design
              Systems. I have over <strong>12 years experience</strong> in Web Development and
              Front-End Engineering, specialising in building user interfaces for web sites and web
              applications.
            </p>
            <p>
              Expert in <strong>Rapid Prototyping</strong> and{' '}
              <strong>Semantic and Accessible</strong> interfaces, I lead and work with engineering
              and design teams which are <strong>research led</strong> and{' '}
              <strong>user focused</strong>.
            </p>
            <p>
              Maker of accessibility colour contrast checker:{' '}
              <a href="http://www.aremycoloursaccessible.com">Are My Colours Accessible</a>
            </p>
            <p>
              Previously <a href="https://www.lightningdesignsystem.com">Salesforce</a>,{' '}
              <a href="http://www.bigcommerce.com">BigCommerce</a>,{' '}
              <a href="https://www.flippa.com">Flippa</a>,{' '}
              <a href="https://www.sitepoint.com">SitePoint</a>,{' '}
              <a href="http://www.orchard.com.au">Orchard</a> and{' '}
              <a href="http://www.abacusemedia.com/">Abacus e-media</a>.
            </p>
          </Ego>
          <HomeSection flavour="pix">
            <HomeSectionHeader flavour="pix">
              <HomeSectionHeaderLink href="https://www.flickr.com/photos/simontaggart">
                <FlickrLogo />
              </HomeSectionHeaderLink>
            </HomeSectionHeader>
            {this.renderFlickrList()}
          </HomeSection>
          <HomeSection flavour="blabber">
            <HomeSectionHeader>
              <HomeSectionHeaderLink flavour="blabber" href="https://www.twitter.com/sitaggart">
                <span className={styleUtils.isSrOnly}>Twitter handle:</span>
                <TwitterHandle>@SiTaggart</TwitterHandle>
              </HomeSectionHeaderLink>
            </HomeSectionHeader>
            <LatestTweet />
          </HomeSection>
          <HomeSection flavour="posts">
            <HomeSectionHeader flavour="posts">Posts</HomeSectionHeader>
            <PostList>
              {posts.map(({ node }) => {
                const title = get(node, 'frontmatter.title') || node.fields.slug;
                return <PostListItem key={node.fields.slug} node={node} title={title} />;
              })}
            </PostList>
          </HomeSection>
        </SiteMain>
      </Layout>
    );
  }
}

// eslint-disable-next-line import/no-default-export
export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        jobTitle
        company
        companyURL
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
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
