
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = require('../../port');

module.exports = (app) => {
  app.use('/api',
    createProxyMiddleware({
      target: `http://localhost:${ port }`,
      changeOrigin: true,
    })
  );
}