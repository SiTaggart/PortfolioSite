import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import { PostList, PostListItem } from '../components/post-list';
import SiteHeader from '../components/site-header';
import SiteMain from '../components/site-main';
import Layout from '../components/layout';

class BlogIndex extends React.Component {
  static propTypes = {
    data: PropTypes.any
  };

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout>
        <Helmet title={siteTitle} />
        <SiteHeader isPost />
        <SiteMain isPost>
          <PostList isFullList>
            {posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug;
              return (
                <PostListItem
                  key={node.fields.slug}
                  node={node}
                  title={title}
                />
              );
            })}
          </PostList>
        </SiteMain>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
          }
        }
      }
    }
  }
`;
