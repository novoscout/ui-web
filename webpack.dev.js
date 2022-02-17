const { merge } = require('webpack-merge');
const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

const distDir = "dev";
const distPath = path.resolve(__dirname, distDir);

const apiScheme = (( process || {}).env || {}).API_SCHEME || 'http';
const apiHostname = (( process || {}).env || {}).API_HOSTNAME || 'api.osteoscout.home';
const apiPort = (( process || {}).env || {}).API_PORT || '';
const forceOffline = (( process || {}).env || {}).FORCE_OFFLINE ? true : false


module.exports = merge(common, {
  mode: 'development',
  // devtool: 'eval-cheap-source-map',
  devtool: false,
  devServer: {
    https: false,
    static: {
      directory: distDir
    }
  },
  optimization: {
    minimize: false,
    splitChunks: {
      // For easier debugging, don't combine files into chunks.
      minSize: 1,
      maxSize: 1,
      // Also retain their path info.
      // hidePathInfo: false,
    }
  },
  output: {
    path: distPath,
    // filename: "[name].js",
    // chunkFilename: "[name].js"
  },

  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          apiScheme: JSON.stringify(apiScheme),
          apiHostname: JSON.stringify(apiHostname),
          apiPort: JSON.stringify(apiPort),
          forceOffline: forceOffline,
          development: true,
          production: false,
          "NODE_TLS_REJECT_UNAUTHORIZED": 0,
        }
      }
    }),

    new miniCssExtractPlugin(),

    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index' ]
    })
  ]
});
