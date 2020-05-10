import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import { SiteMain } from '../components/site-main';
import { SiteHeader } from '../components/site-header';
import { PostArticle } from '../components/post-article';
import { PostHeader, PostHeaderHeading, PostHeaderDate } from '../components/post-header';
import { PostFooter } from '../components/post-footer';
import { PostFooterList } from '../components/post-footer-list';
import { PostFooterListItem } from '../components/post-footer-list-item';

const BlogPostTemplate = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  const siteTitle = get(data, 'site.siteMetadata.title');
  const { previous, next } = pageContext;

  return (
    <>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>
        <meta content={post.excerpt} name="description" />
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
                  <Link rel="prev" to={previous.fields.slug}>
                    ← {previous.frontmatter.title}
                  </Link>
                </PostFooterListItem>
              )}

              {next && (
                <PostFooterListItem type="next">
                  <Link rel="next" to={next.fields.slug}>
                    {next.frontmatter.title} →
                  </Link>
                </PostFooterListItem>
              )}
            </PostFooterList>
          </PostFooter>
        </PostArticle>
      </SiteMain>
    </>
  );
};
BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      post: PropTypes.shape({
        excerpt: PropTypes.string,
        html: PropTypes.string,
        frontmatter: PropTypes.shape({
          title: PropTypes.string,
          date: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }).isRequired,
};

// eslint-disable-next-line import/no-default-export
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
