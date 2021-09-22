const { merge } = require('webpack-merge'); // Doesn't destroy existing, whereas Object.assign() does.
const common = require('./webpack.common.js');
const path = require('path');
const terser = require("terser-webpack-plugin");
const webpack = require('webpack');

const hashDigestLength = 24;
const hashFunction = 'sha512';

const distDir = "dist";
const distPath = path.resolve(__dirname, distDir);

const defaultSettings = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      minSize: 1,
      maxSize: 100000,
      hidePathInfo: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const plain_name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return plain_name
          },
        }
      }
    },
    minimize: true,
    minimizer: [
      new terser({
        parallel: true,
        // extractComments: true,
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
          NODE_ENV: JSON.stringify('production'),
        }
      }
    }),
  ]
};

const exp = [];

// const alts = ["commonjs","commonjs2","commonjs-module","amd","umd","umd2","var","window"];
// 
// alts.forEach( (altType) => {
//   let cfg = merge({}, common, defaultSettings);
//   const newEntry = {entry:common.entry};
//   const oldKey = common.entry;
//   const newKey = String(oldKey).replace(".js","_" + altType);
//   const newFilename = String(oldKey).replace(".js", "." + altType);
// 
//   cfg.output.filename = newKey + ".min.js";
// 
//   Object.defineProperty(
//     newEntry,
//     newKey,
//     Object.getOwnPropertyDescriptor(newEntry, oldKey));
//   delete newEntry[oldKey];
// 
//   newEntry[newKey].filename = newFilename + ".min.js";
// 
//   const newCfg = Object.assign({},cfg, { entry: newEntry });
//   exp.push(merge(defaultSettings, newCfg));
// });
// 
// module.exports = exp;

common.forEach( (cfg) => {
  exp.push(merge(cfg,defaultSettings))
});

module.exports = exp;
