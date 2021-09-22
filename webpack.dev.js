const { merge } = require('webpack-merge');
const path = require("path")
const webpack = require('webpack')

const common = require('./webpack.common.js');

const distDir = "dev"
const distPath = path.resolve(__dirname, distDir)

const defaultSettings = {
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
  },
  output: {
    path: distPath
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('development'),
        }
      }
    })
  ]
};

const exp = [];

common.forEach( (cfg) => {
  exp.push(merge(cfg,defaultSettings))
});

module.exports = exp;
