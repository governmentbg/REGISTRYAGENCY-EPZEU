const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const utils = require('./utils.js');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  console.log(isDevBuild ? "--Building vendors on development mode--" : "--Building vendors on production mode--")

  const vendor = [
    'babel-polyfill',
    'numeral',
    'moment',
    'mobx',
    'mobx-react',
    'react-datetime',
    'react-datetime/css/react-datetime.css',
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'reactstrap',
    'jquery',
    'js-cookie',
    'bluebird',
    'cache',
    'oidc-client',
    'typescript-collections',
    'query-string',
    'lz-string'
  ]

  return [{
    context: __dirname,
    mode: isDevBuild ? 'development' : 'production',
    devtool: isDevBuild ? 'eval' : 'none',
    entry: {
      vendor
    },
    output: {
      path: utils.root('target/classes/static/app'),
      filename: '[name].' + utils.parseVersion() + '.bundle.js',
      chunkFilename: '[name]s.' + utils.parseVersion() + '.chunk.js',
      library: '[name]_[hash]',
      publicPath: 'app/'
    },
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          //extractComments: true
        }),
      ],
      splitChunks: {
        chunks: "async",
        cacheGroups: {
          vendor: {
            test: /\.css(\?|$)/,
            name: 'vendor',
            chunks: 'all'
          }
        },
      },
      removeAvailableModules: true,
      removeEmptyChunks: true,
      providedExports: true,
      usedExports: false,
      sideEffects: false,
      concatenateModules: false,
      namedModules: isDevBuild,
      nodeEnv: isDevBuild ? "development" : "production"
    },
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [
        { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
        {
          test: /\.css(\?|$)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                camelCase: 'dashes',
              }
            }]
        },
      ]
    },
    stats: { modules: false },
    plugins: [
      new webpack.ProvidePlugin({ Promise: 'bluebird', $: 'jquery', jQuery: 'jquery' }),
      new webpack.DllPlugin({
        path: utils.root('target/classes/static/app/[name]-manifest.json'),
        name: '[name]_[hash]'
      }),
      new MiniCssExtractPlugin({       
        filename: '../css/[name]s.css?v=[chunkhash]'
      }),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /bg/),
    ],
    performance: {
      maxAssetSize: 100000000
    },
  }]
};
