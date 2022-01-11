const path = require("path");
const webpack = require("webpack");
const copyPlugin = require("copy-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin');


// Webpack 5 no longer automatically bundles certain polyfills.
const bundleFallbacks = {
  "assert": false, /* require.resolve("assert/"), */
  "buffer": false, /* require.resolve("buffer/"), */
  "child_process": false, /* require.resolve("child_process"), */
  "constants": false, /* require.resolve("constants-browserify"), */
  "http": false, /* require.resolve("stream-http"), */
  "https": false, /* require.resolve("https-browserify"), */
  "stream": false, /* require.resolve("stream-browserify"), */
}

// Fake file-system for web browsers. Need to do this so
// trivial-api works. FIXME Move to trivial-api..?
// Note: see externals below.
const fs = require('graceful-fs');
const realFs = require('fs');
fs.gracefulify(realFs);

const externals = [
  {
    // Ensure react-native is added to externals
    // otherwise require("react-native") in ui-shared
    // causes it to be added to the ui-web bundle.
    "react-native": "react-native",

    // Ensure node-fetch is ignored. It has fancy aliases
    // in its deps e.g. "node:zlib" which give webpack
    // a hernia. So ignore it when bundling for browser.
    "node-fetch": "node-fetch",

    fs: fs
  }
];

// Nice: https://3perf.com/blog/polyfills/
// Note also core-js aliases so ui-shared can use the necessaries.
// Add this back in after figuring out whether to use this or polyfill.io!
// Further note. See babel.config.json which is currently necessary
// to prevent Babel changing require() to import().
const babelPresets = [
  [ '@babel/preset-env',
    {
      modules: false,
      // corejs: "3.18.2",
      // useBuiltIns: "usage",
      // targets: {
      //   browsers: [
      //     "> 0.25%",
      //     "not dead"
      //   ]
      // }
    }
  ],
  [ "@babel/preset-react", {} ]
];

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
];

module.exports = {
  devServer: {
    host: "app.osteoscout.home",
    allowedHosts: [ ".nip.io", ".osteoscout.home" ],
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH'
    },
    static: {
      /* See output.publicPath below. */
      publicPath: "/"
    }
  },
  externals: externals,
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
    "styles.min": [
      path.resolve(__dirname, "public/assets/css/base.css"),
      path.resolve(__dirname, "public/assets/css/print.css")
    ]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          // "style-loader",
          miniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/i,
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
      }
    ],
  },
  output: {
    clean: true,
    libraryExport: 'default',
    globalObject: 'this',

    /**
     * Ensure compiled scripts are served from root. This is vital when visiting
     * routes that are not real files, but are resolved by (P)React router.
     */
    publicPath: '/'
  },
  plugins: [
    new copyPlugin({
      patterns: [{from:"static/"}]
    }),
    new miniCssExtractPlugin()
  ],

  resolve: {
    fallback: { ...bundleFallbacks },
    alias: {

      // All aliases here need full paths so ui-shared can find them during build.
      // Any web-related stuff that ui-shared refers to (e.g. React, cxs) must be added here.

      "react$": path.resolve(__dirname,"node_modules/preact"),

      "react-dom/test-utils$": path.resolve(__dirname,"node_modules/preact/test-utils"),
      "react-dom": path.resolve(__dirname,"node_modules/preact/compat"), // must be below test-utils
      "react-dom/unstable-native-dependencies$": path.resolve(__dirname,"node_modules/preact-responder-event-plugin"),

      "cxs": path.resolve(__dirname,"node_modules/cxs"),
      "cxs/component": path.resolve(__dirname,"node_modules/cxs/component"),

      "core-js": path.resolve(__dirname,"node_modules/core-js"),
      "core-js-compat": path.resolve(__dirname,"node_modules/core-js-compat"),

      // "babel-runtime": "@babel/runtime",
      // "react-addons-test-utils": "preact/test-utils",
      // "react-addons-perf": path.resolve(__dirname, "lib/react-addons-perf-mock"),

      // Resolve files with web-specific extensions or general js/json.
      // Do NOT resolve native-specific files e.g. ".android.js", ".native.js", ".ios.js", etc.
      extensions: [".js",".web.js",".json",".web.json"]
    }
  }
};
