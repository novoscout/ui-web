const { merge } = require('webpack-merge');
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const dev = require('./webpack.dev.js');

dev.plugins = undefined;

module.exports = merge(dev, {
  entry: path.resolve(__dirname, "src/Debug/index.js"),
  plugins: [
    new htmlWebpackPlugin({
      template: './public/debug.html',
      filename: 'index.html',
    })
  ]
});
