var serverFactory = require('./node_modules/spa-server');

var server = serverFactory.create({
  path: './build',
  port: process.env.PORT || 3000,
  fallback: './build/index.html'
});

server.start();