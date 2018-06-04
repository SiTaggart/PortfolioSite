import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import SiteMain from '../components/site-main';
import SiteHeader from '../components/site-header';
import PostArticle from '../components/post-article';
import {
  PostHeader,
  PostHeaderHeading,
  PostHeaderDate
} from '../components/post-header';
import PostFooter from '../components/post-footer';
import PostFooterList from '../components/post-footer-list';
import PostFooterListItem from '../components/post-footer-list-item';

class BlogPostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.any,
    pathContext: PropTypes.any
  };

  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const { previous, next } = this.props.pathContext;

    return (
      <React.Fragment>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>
          <meta name="description" content={post.excerpt} />
        </Helmet>
        <SiteHeader isPost />
        <SiteMain isPost>
          <PostArticle>
            <PostHeader>
              <PostHeaderHeading>{post.frontmatter.title}</PostHeaderHeading>
              <PostHeaderDate>{post.frontmatter.date}</PostHeaderDate>
            </PostHeader>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <PostFooter>
              <PostFooterList>
                {previous && (
                  <PostFooterListItem type="previous">
                    <Link to={previous.fields.slug} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  </PostFooterListItem>
                )}

                {next && (
                  <PostFooterListItem type="next">
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title} →
                    </Link>
                  </PostFooterListItem>
                )}
              </PostFooterList>
            </PostFooter>
          </PostArticle>
        </SiteMain>
      </React.Fragment>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
