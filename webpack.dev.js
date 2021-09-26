const { merge } = require('webpack-merge');
const path = require("path");
const webpack = require('webpack');

const common = require('./webpack.common.js');

const distDir = "dev";
const distPath = path.resolve(__dirname, distDir);

module.exports = merge(common, {
  mode: 'development',
  devtool: false,
  devServer: {
    clientLogLevel: 'info',
    contentBase: distPath,
    disableHostCheck: true,
    host: "localhost",
    hot: false,
    https: false,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    historyApiFallback: true,
    port: 3000,
    publicPath: "/" + distDir + "/",
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
          novoscout: {
            development: true,
            production: false
          }
        }
      }
    })
  ]
});
