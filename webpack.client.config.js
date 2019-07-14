const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'public'),
  },
};

module.exports = merge(baseConfig, config);
