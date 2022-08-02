//TODO the output main.bundle.js size is too large
const webpack = require('webpack');
const path = require('path');
const utils = require('./utils.js');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = 'production';

module.exports = webpackMerge(commonConfig({env: ENV}), {
  mode: ENV,
  entry: {
    main: './src/main/webapp/app/Boot.tsx'
  },
  output: {
    path: utils.root('target/classes/static'),
    filename: 'app/[name].' + utils.parseVersion() + '.bundle.js',
    chunkFilename: 'app/[id].' + utils.parseVersion() + '.chunk.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        extractComments: true
      }),
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
});
