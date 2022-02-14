const { merge } = require('webpack-merge'); // Doesn't destroy existing, whereas Object.assign() does.
const common = require('./webpack.common.js');
const path = require('path');
const terser = require("terser-webpack-plugin");
const webpack = require('webpack');

const miniCssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const htmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");


// FIXME Determine best (smallest, most widely compatible) choice:
// const alts = ["commonjs","commonjs2","commonjs-module","amd","umd","umd2","var","window"];

const hashDigestLength = 24;
const hashFunction = 'sha512';

const distDir = "dist";
const distPath = path.resolve(__dirname, distDir);

const apiScheme = (( process || {}).env || {}).API_SCHEME || 'https';
const apiHostname = (( process || {}).env || {}).API_HOSTNAME || 'api.osteoscout.com';
const apiPort = (( process || {}).env || {}).API_PORT || '';


module.exports = merge(common, {
  devServer: {
    allowedHosts: [".osteoscout.home",".osteoscout.com"],
    https: true,
    static: {
      directory: distDir
    }
  },

  // devtool: 'source-map',

  mode: 'production',

  // module: {
  //   rules: [
  //     {
  //       // include: /static\/assets\/css/,
  //       exclude: /node_modules/,
  //       test: /.s?css$/i,
  //       use: [
  //         miniCssExtractPlugin.loader,
  //         "css-loader",
  //         "sass-loader"
  //       ]
  //     }
  //   ]
  // },

  optimization: {
    splitChunks: {
      minSize: 1,
      maxSize: Infinity,
      hidePathInfo: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          enforce: true,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const plain_name = String(
              module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            ).replace("@","_at_")
            return plain_name
          },
        }
      }
    },
    minimize: true,
    minimizer: [
      new terser({
        parallel: true,
        extractComments: true,
        terserOptions: {
          warnings: true,
          compress: {
            keep_infinity: true,
            passes: 2,
          },
          mangle: {
            ie8: true,
            safari10: true,
            toplevel: true,
          },
          output: {
            beautify: false,
            comments: false,
          },
          ie8: true,
          safari10: true,
        }
      }),
      new cssMinimizerPlugin(),
      new htmlMinimizerPlugin()
    ],
  },

  output: {
    path: distPath,
    filename: '[contenthash].js',
    chunkFilename: '[contenthash].js',
    hashFunction: hashFunction,
    hashDigestLength: hashDigestLength
  },

  plugins: [
    // Ensure file hashes don't change unexpectedly
    new webpack.ids.HashedModuleIdsPlugin({
      hashFunction: hashFunction
    }),

    new webpack.DefinePlugin({
      process: {
        env: {
          apiScheme: JSON.stringify(apiScheme),
          apiHostname: JSON.stringify(apiHostname),
          apiPort: JSON.stringify(apiPort),
          development: false,
          production: true
        }
      }
    }),

    new miniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['index'], // 'styles'],
      minify: true,
      hash: true
    })
  ]
});
