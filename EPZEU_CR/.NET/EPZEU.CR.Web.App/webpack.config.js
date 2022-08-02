/// <binding />
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
//const bundleOutputDir = './wwwroot/dist';

// the clean options to use
let cleanOptions = {
    root: path.join(__dirname, 'wwwroot/dist'),
    cleanOnceBeforeBuildPatterns: ['**/*', '!vendor.css', '!vendor.js', '!vendor-manifest.json'],
    verbose: true,
    dry: false
};

module.exports = smp.wrap((env) => {

    const isDevBuild = !(env && env.prod);
    console.log(isDevBuild ? "--Building main js on development mode--" : "---Building main js on production mode--")

    return [{
        context: __dirname,
        mode: isDevBuild ? 'development' : 'production',
        entry: {
            main: './ClientApp/boot.tsx',
            oidcsignin: './ClientApp/oidcsignin.ts',
            oidcrenew: './ClientApp/oidcrenew.ts',
            oidcfrontchannellogout: './ClientApp/oidcfrontchannellogout.ts'
        },
        output: {
            path: path.join(__dirname, 'wwwroot/dist'),
            chunkFilename: '[name].[chunkhash].js',
            filename: '[name].[chunkhash].js',
            publicPath: 'dist/'
        },
        optimization: {
            minimize: !isDevBuild,
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
                'node_modules',
                path.resolve(__dirname, "ClientApp")
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                'Cnsys.Core': path.resolve(__dirname, 'ClientApp/Cnsys.Core'),
                'Cnsys.UI.React': path.resolve(__dirname, 'ClientApp/Cnsys.UI.React'),
                'EPZEU.Core': path.resolve(__dirname, 'ClientApp/EPZEU.Core'),
                'EPZEU.CR.Core': path.resolve(__dirname, 'ClientApp/EPZEU.CR.Core'),
                'EPZEU.CR.ApplicationProcesses': path.resolve(__dirname, 'ClientApp/EPZEU.CR.ApplicationProcesses'),
                'EPZEU.CR.Domain': path.resolve(__dirname, 'ClientApp/EPZEU.CR.Domain'),
                'EPZEU.CR.Portal': path.resolve(__dirname, 'ClientApp/EPZEU.CR.Portal'),
                'EPZEU.CR.Reports': path.resolve(__dirname, 'ClientApp/EPZEU.CR.Reports'),
            },
        },
        devtool: isDevBuild ? 'cheap-module-eval-source-map' : '',
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
                                minimize: !isDevBuild
                            }
                        }]
                },
                {
                    test: /\.tsx?$/, include: /ClientApp/, use: [
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                // workers: require('os').cpus().length - 1,
                                workers: isDevBuild
                                    ? 3
                                    : require('os').cpus().length - 1 // fastest build time for devServer: 3 threads; for production: 7 threads (os cpus minus 1)
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
            new CleanWebpackPlugin(cleanOptions),
            new webpack.ProvidePlugin({ Promise: 'bluebird', $: 'jquery', jQuery: 'jquery' }), //������ �� ������� ��� ������ �� �� ������ � � ���� - GlobalResolver.d.ts
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
            new MiniCssExtractPlugin({
                filename: '[name].css?v=[chunkhash]'
            })
        ],
        stats: { modules: false }
    }]
});