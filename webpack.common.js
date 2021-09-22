const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const copyPlugin = require("copy-webpack-plugin")

const hashDigestLength = 20
const hashFunction = 'sha512'

// Fake file-system for web browsers. Need to do this so
// trivial-api works. FIXME Move to trivial-api..?
// Note: see externals below.
const fs = require('graceful-fs')
const realFs = require('fs')
fs.gracefulify(realFs)

externals = {
  fs: fs
}

let defaultSettings = {
  // externals: {
  //   preact: "preact",
  //   react: "react",
  // },
  externals: externals,
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {

          // These should not be transpiled by Webpack:
          exclude: [
            /node_modules[\\\/]core-js/,
            /node_modules[\\\/]webpack[\\\/]buildin/,
          ],

          presets: [
            [ '@babel/preset-env', { targets: { browsers: [ "last 3 versions" ] } } ],
            [ "@babel/preset-react" ]
          ],

          plugins: [
            // Reduce bundle size by preventing Babel from
            // duplicating its helper functions in every file
            // and instead using this common lib. Note,
            // this requires @babel/runtime to be added
            // as a dependency (not a dev dependency).
            [
              "@babel/transform-runtime", {
                "regenerator": true,
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": true,
              }
            ],

            [ '@babel/plugin-syntax-jsx' ],
            [ '@babel/plugin-syntax-dynamic-import' ],
            [ '@babel/plugin-transform-react-jsx', { pragma: "h" } ],
            // [ '@babel/plugin-transform-react-jsx-development' ],
          ]
        },
      },
    }],
  },
  output: {
    // filename: 'index.js',
    // chunkFilename: 'index.js',
    hashDigestLength: hashDigestLength,
    hashFunction: hashFunction,
    libraryExport: 'default',
    globalObject: 'this',
  },
  plugins: [
    // Ensure file hashes don't change unexpectedly
    new webpack.ids.HashedModuleIdsPlugin({
      hashFunction: hashFunction,
    }),
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),

    new copyPlugin({
      patterns: [{from:"static/"}]
    })
  ],

  resolve: {
    alias: {
      'react$': 'preact/compat', // /compat',

      'react-dom/test-utils$': 'preact/test-utils',
      'react-dom': 'preact/compat', // must be below test-utils
      "react-dom/unstable-native-dependencies$": "preact-responder-event-plugin",

      // "babel-runtime": "@babel/runtime",
      // "react-addons-test-utils": "preact/test-utils",
      // "react-addons-perf": path.resolve(__dirname, "lib/react-addons-perf-mock"),
    }
  }
};

// let otherBuildSettings = Object.assign({},defaultSettings,{
//   entry: {
//     somethingElse: {
//       import: "./src/index.js",
//       filename: "something-else.js",
//       library: { name: "my-fancy-library" }
//     }
//   }
// });

module.exports = [
  defaultSettings
]; // add otherBuildSettings to this array
