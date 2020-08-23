const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// css, stylus
const extractCSSApp = new ExtractTextPlugin('assets/css/app.[contenthash].css');
const extractCSSVendor = new ExtractTextPlugin('assets/css/vendor.[contenthash].css');
const autoprefixer = require('autoprefixer-stylus');

module.exports = (env) => {
  return {
    entry: {
      vendor: `${__dirname}/src/app.vendors.js`,
      app: `${__dirname}/src/app.module.js`
    },
    output: {
      filename: 'assets/js/[name].[hash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: 'assets/js/[id].[chunkhash].js'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        hash: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
      }),
      new CopyWebpackPlugin([
        { context: 'src/assets/images', from: '**', to: 'assets/images' },
        { context: 'src/assets/fav', from: '**', to: 'assets/fav' }
      ]),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      extractCSSVendor,
      extractCSSApp
    ],
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'file-loader?name=[hash].[ext]&outputPath=assets/images/',
            'img-loader'
          ]
        },
        {
          test: /\.styl$/,
          use: extractCSSApp.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                use: [autoprefixer()]
              }
            }]
          })
        },
        {
          test: /\.css$/,
          use: extractCSSVendor.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true
              }
            }]
          })
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }]
        }
      ]
    }
  }
};