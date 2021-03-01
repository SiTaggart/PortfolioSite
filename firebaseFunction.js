const { https } = require('firebase-functions');
const { default: next } = require('next');
const nextConfig = require('./next.config');

const nextjsServer = next({
  dev: false,
  conf: {
    ...nextConfig,
    distDir: '.next',
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
