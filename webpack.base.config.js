const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.modernizrrc$/,
        loader: 'modernizr-loader!json-loader',
      },
      {
        test: /\.module\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      UIComponents: path.resolve(__dirname, 'src/components/UI'),
      AppComponents: path.resolve(__dirname, 'src/components'),
      AppContainers: path.resolve(__dirname, 'src/containers'),
      Redux: path.resolve(__dirname, 'src/redux'),
      Utils: path.resolve(__dirname, 'src/utils'),
      HOC: path.resolve(__dirname, 'src/hoc'),
      Config: path.resolve(__dirname, 'src/config'),
    },
  },
};
