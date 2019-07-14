const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const config = {
  target: 'node',
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
