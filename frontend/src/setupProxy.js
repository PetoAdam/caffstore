const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = "http://petonet.ddns.net:5000/"

const context = [
  "/api",
  "/.well-known",
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    },
  });

  app.use(appProxy);
};
