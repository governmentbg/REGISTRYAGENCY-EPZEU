const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const utils = require('./utils.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getTsLoaderRule = env => {
  const rules = [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('target/cache-loader')
      }
    },
    {
      loader: 'thread-loader',
      options: {
        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
        workers: require('os').cpus().length - 1
      }
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true
      }
    }
  ];
  if (env === 'development') {
    rules.unshift({
      loader: 'react-hot-loader/webpack'
    });
  }
  return rules;
};

module.exports = options => ({
  cache: options.env !== 'production',
  entry: {
    vendor: 'react-datetime/css/react-datetime.css',
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ],
    alias: {
      'Cnsys.Core': path.resolve(__dirname, '../src/main/webapp/app/Cnsys.Core'),
      'Cnsys.UI.React': path.resolve(__dirname, '../src/main/webapp/app/Cnsys.UI.React'),
      'EPZEU.Core': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.Core'),
      'EPZEU.PR.Core': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.Core'),
      'EPZEU.PR.ApplicationProcesses': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.ApplicationProcesses'),
      'EPZEU.PR.ApplicationBase': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.ApplicationBase'),
      'EPZEU.PR.Portal': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.Portal'),
      'EPZEU.PR.Applications': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.Applications'),
      'EPZEU.PR.Applications.Reports': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.Applications.Reports'),
      'EPZEU.PR.Reports': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.Reports'),
      'EPZEU.PR.TaxesCalculator': path.resolve(__dirname, '../src/main/webapp/app/EPZEU.PR.TaxesCalculator')
    },
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: getTsLoaderRule(options.env),
        include: [utils.root('./src/main/webapp/app')],
        exclude: ['node_modules']
      },
      {
        enforce: 'pre',
        test: /\.s?css$/,
        loader: 'stripcomment-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              modules: true,
              camelCase: 'dashes',
              minimize: (options.env !== 'development')
            }
          },
          'css-loader'
        ]
      },

      { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
    ]
  },
  stats: {
    children: false,
    modules: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: 'css/[name].css?v=[chunkhash]',
      chunkFilename: 'css/[name].css?v=[chunkhash]'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${options.env}'`,
        VERSION: `'${utils.parseVersion()}'`,
        DEBUG_INFO_ENABLED: options.env === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"http://www.cnsys:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `application.cors` common Application property in the `application-*.yml` configurations)
        SERVER_API_URL: `''`
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/main/webapp/static/', to: '' }
    ]),
    // new HtmlWebpackPlugin({
    //   template: './src/main/webapp/index.html',
    //   chunksSortMode: 'none',
    //   inject: 'body'
    // }),
  ]
});
