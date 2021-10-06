const { merge } = require('webpack-merge');
const path = require("path");

const dev = require('./webpack.dev.js');

module.exports = merge(dev, {
  entry: path.resolve(__dirname, "src/Debug/index.js")
});
