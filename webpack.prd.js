const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = (env) => Merge(require('./webpack.common.js')(env), {
  entry: {
    appdynamics: './src/appDynamics/init.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('PRD')
      }
    }),
    new MinifyPlugin(
      {
        removeConsole: true,
        removeDebugger: true
      }, {
      comments: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [
          'babel-loader'
        ]
      }
    ]
  }
})