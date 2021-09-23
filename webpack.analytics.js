const { merge } = require('webpack-merge');
const prodCfg = require('./webpack.prod.js');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(prodCfg, {
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  optimization: {
    splitChunks: {
      hidePathInfo: false
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      generateStatsFile: true
    }),
  ],
});
