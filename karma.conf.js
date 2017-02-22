const webpack = require('karma-webpack');
const webpackConfig = require('./webpack.config');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [ 'mocha', 'sinon-chai' ],
    files: [
      'app/**/*.spec.js'
    ],
    plugins: [
      webpack,
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-mocha-reporter'
    ],
    logLevel: config.LOG_INFO,
    loggers: [ {type: 'console'} ],
    browsers: [ 'Chrome' ],
    preprocessors: {
      'app/**/*.spec.js': [ 'webpack' ],
      'app/**/*.js': [ 'webpack' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  });
};
