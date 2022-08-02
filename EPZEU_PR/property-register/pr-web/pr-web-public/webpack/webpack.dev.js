const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';
module.exports = webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'eval-source-map',
  mode: ENV,
  entry: {
    main: './src/main/webapp/app/Boot.tsx',
    oidcsignin: './src/main/webapp/app/oidcsignin.ts',
    oidcrenew: './src/main/webapp/app/oidcrenew.ts',
    oidcfrontchannellogout: './src/main/webapp/app/oidcfrontchannellogout.ts'
  },
  output: {
    path: utils.root('target/classes/static'),
    filename: 'app/[name].' + utils.parseVersion() + '.bundle.js',
    chunkFilename: 'app/[id].' + utils.parseVersion() + '.chunk.js'
  },
  module: {
    rules: [
    ]
  },
  devServer: {
    stats: {
      children: false
    },
    hot: true,
    contentBase: './target/classes/static',
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },
    publicPath: '/pr/',
    proxy: [{
      context: [
        /* Add web service api paths here */
        '/api'
      ],
      target: 'http://localhost:8080',
      secure: false
    }],
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.ProvidePlugin({ Promise: 'bluebird', $: 'jquery', jQuery: 'jquery' }), //When you add aliases here you have to add them and in GlobalResolver.d.ts file
    new BrowserSyncPlugin({
      open: 'external',
      host: 'nb-soft11.cnsys.plc',
      port: 9000,
      proxy: {
        target: 'http://localhost:9060'
      }
    }, {
        reload: false
      }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('src/test'),
    ]),
    new WebpackNotifierPlugin({
      title: 'Application is ready!'
    })
  ]
});
