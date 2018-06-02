/*eslint-env node*/

var autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: 'Simon Taggart - Front-End Engineer and Designer',
    author: 'Simon Taggart',
    description:
      'The home of the English Front End Engineer, Simon Taggart, where you can learn of his skills, musings, and loves.',
    jobTitle: 'Lead UX Engineer',
    company: 'Salesforce UX',
    companyURL: 'https://twitter.com/SalesforceUX'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [autoprefixer()]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-10401619-1'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    '@jacobmischka/gatsby-plugin-react-svg',
    'gatsby-plugin-netlify'
  ]
};
