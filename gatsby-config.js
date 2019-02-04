/*eslint-env node*/

var autoprefixer = require('autoprefixer');
var proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: 'Simon Taggart - Front-End Engineer and Designer',
    author: 'Simon Taggart',
    description:
      'The home of the English Front End Engineer, Simon Taggart, where you can learn of his skills, musings, and loves.',
    jobTitle: 'Principal Front End Engineer',
    company: 'Twilio',
    companyURL: 'https://www.twilio.com'
  },
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': ''
        }
      })
    );
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [autoprefixer()],
        precision: 8,
        cssLoaderOptions: {
          localIdentName: '[local]--[hash:base64:5]'
        }
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
    'gatsby-plugin-react-svg',
    'gatsby-plugin-netlify'
  ]
};
