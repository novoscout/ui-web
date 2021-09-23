const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const copyPlugin = require("copy-webpack-plugin")

// Fake file-system for web browsers. Need to do this so
// trivial-api works. FIXME Move to trivial-api..?
// Note: see externals below.
const fs = require('graceful-fs')
const realFs = require('fs')
fs.gracefulify(realFs)

const externals = [
  {
    // Ensure react-native is added to externals, otherwise
    // the require("react-native") in ui-shared
    // causes it to be added to the ui-web bundle.
    "react-native": "react-native",

    fs: fs
  }
]

const babelPresets = [
  [ '@babel/preset-env', { modules: false, targets: { browsers: [ "last 3 versions" ] } } ],
  [ "@babel/preset-react", {} ]
]

const babelPlugins = [
  [ '@babel/plugin-transform-react-jsx', { pragma: "h" } ],
  [ '@babel/plugin-syntax-dynamic-import', {} ],
  [ "@babel/plugin-transform-regenerator", {} ],
  [ '@babel/plugin-syntax-jsx', {} ],
  [ "transform-react-remove-prop-types", {} ],
  [ "@babel/plugin-proposal-class-properties", {} ],

  // [ '@babel/plugin-transform-react-jsx-development' ],

  // Reduce bundle size by preventing Babel from
  // duplicating its helper functions in every file
  // and instead using this common lib. Note,
  // this requires @babel/runtime to be added
  // as a dependency (not a dev dependency).
  [
    "@babel/plugin-transform-runtime", {
      "regenerator": true,
      "absoluteRuntime": false,
      "corejs": false,
      "helpers": false,
    }
  ],
]

let defaultSettings = {
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

          presets: babelPresets,

          plugins: babelPlugins
        },
      },
    }],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryExport: 'default',
    globalObject: 'this',
  },
  plugins: [
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

      // All aliases here need full paths so ui-shared can find them during build.
      // Any web-related stuff that ui-shared refers to (e.g. React, cxs) must be added here.

      "react$": path.resolve(__dirname,"node_modules/preact"),

      "react-dom/test-utils$": path.resolve(__dirname,"node_modules/preact/test-utils"),
      "react-dom": path.resolve(__dirname,"node_modules/preact/compat"), // must be below test-utils
      "react-dom/unstable-native-dependencies$": path.resolve(__dirname,"node_modules/preact-responder-event-plugin"),

      "cxs": path.resolve(__dirname,"node_modules/cxs"),
      "cxs/component": path.resolve(__dirname,"node_modules/cxs/component"),

      // "babel-runtime": "@babel/runtime",
      // "react-addons-test-utils": "preact/test-utils",
      // "react-addons-perf": path.resolve(__dirname, "lib/react-addons-perf-mock"),

      // Resolve files with web-specific extensions or general js/json.
      // Do NOT resolve native-specific files e.g. ".android.js", ".native.js", ".ios.js", etc.
      extensions: [".js",".web.js",".json",".web.json"]
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
