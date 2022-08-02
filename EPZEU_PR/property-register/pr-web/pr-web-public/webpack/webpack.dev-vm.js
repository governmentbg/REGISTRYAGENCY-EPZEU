const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const utils = require('./utils.js');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {

  console.log("---Building main js on development mode--");

  return [{
    context: __dirname,
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
      main: utils.root('/src/main/webapp/app/Boot.tsx'),
      oidcsignin: utils.root('/src/main/webapp/app/oidcsignin.ts'),
      oidcrenew: utils.root('/src/main/webapp/app/oidcrenew.ts'),
      oidcfrontchannellogout: utils.root('/src/main/webapp/app/oidcfrontchannellogout.ts')
    },
    output: {
      path: utils.root('target/classes/static/app'),
      chunkFilename: '[name].' + utils.parseVersion() + '.chunk.js',
      filename: '[name].' + utils.parseVersion() + '.bundle.js',
      publicPath: '/pr/app/'
    },
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: "async",
        cacheGroups: {
          site: {
            test: /\.css$/,
            name: 'site',
            chunks: 'all',
            enforce: true
          }
        }
      },
    },
    resolve: {
      modules: [
        utils.root('/node_modules'),
        utils.root("/src/main/webapp/app")
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'Cnsys.Core': utils.root('/src/main/webapp/app/Cnsys.Core'),
        'Cnsys.UI.React': utils.root('/src/main/webapp/app/Cnsys.UI.React'),
        'EPZEU.Core': utils.root('/src/main/webapp/app/EPZEU.Core'),
        'EPZEU.PR.Core': utils.root('/src/main/webapp/app/EPZEU.PR.Core'),
        'EPZEU.PR.ApplicationProcesses': utils.root('/src/main/webapp/app/EPZEU.PR.ApplicationProcesses'),
        'EPZEU.PR.ApplicationBase': utils.root('/src/main/webapp/app/EPZEU.PR.ApplicationBase'),
        'EPZEU.PR.Portal': utils.root('/src/main/webapp/app/EPZEU.PR.Portal'),
        'EPZEU.PR.Applications': utils.root('/src/main/webapp/app/EPZEU.PR.Applications'),
        'EPZEU.PR.Applications.Reports': utils.root('/src/main/webapp/app/EPZEU.PR.Applications.Reports'),
        'EPZEU.PR.Reports': utils.root('/src/main/webapp/app/EPZEU.PR.Reports'),
        'EPZEU.PR.TaxesCalculator': utils.root('/src/main/webapp/app/EPZEU.PR.TaxesCalculator')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: 'dashes',
                minimize: false
              }
            }]
        },
        {
          test: /\.tsx?$/, include: /app/, use: [
            {
              loader: 'thread-loader',
              options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                // workers: require('os').cpus().length - 1,
                workers: require('os').cpus().length - 1 // fastest build time for devServer: 3 threads; for production: 7 threads (os cpus minus 1)
              }
            },
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
                happyPackMode: true
              }
            }]
        },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({ Promise: 'bluebird', $: 'jquery', jQuery: 'jquery' }), //������ �� ������� ��� ������ �� �� ������ � � ���� - GlobalResolver.d.ts
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(utils.root('target/classes/static/app/vendor-manifest.json'))
      }),
      new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true, tsconfig: utils.root('tsconfig.json') }),
      new MiniCssExtractPlugin({
        filename: '[name].' + utils.parseVersion() + '.css?v=[chunkhash]'
      }),
      new CopyWebpackPlugin([
        { from: utils.root('/src/main/webapp/static/'), to: utils.root('/target/classes/static') }
      ])
    ],
    stats: { modules: false }
  }]
};
