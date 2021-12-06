const { merge } = require('webpack-merge');
const path = require("path");
const webpack = require('webpack');

const common = require('./webpack.common.js');

const distDir = "dev";
const distPath = path.resolve(__dirname, distDir);

const apiScheme = (( process || {}).env || {}).API_SCHEME || 'http';
const apiHostname = (( process || {}).env || {}).API_HOSTNAME || 'api.osteoscout.local';
const apiPort = (( process || {}).env || {}).API_PORT || '';

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
      // Also retain their path info.
      minSize: 1,
      maxSize: 1,
      hidePathInfo: false,
    }
  },
  output: {
    path: distPath,
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          apiScheme: JSON.stringify(apiScheme),
          apiHostname: JSON.stringify(apiHostname),
          apiPort: JSON.stringify(apiPort),
          development: true,
          production: false
        }
      }
    })
  ],
});
