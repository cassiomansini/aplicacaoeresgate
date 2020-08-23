const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');

module.exports = (env) => Merge(require('./webpack.common.js')(env), {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    publicPath: '/',
    contentBase: './dist',
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'STYLUS_COV': null,
        'NODE_ENV': JSON.stringify('LOCAL')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  }
})