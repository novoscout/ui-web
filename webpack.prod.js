const { merge } = require('webpack-merge') // Doesn't destroy existing, whereas Object.assign() does.
const common = require('./webpack.common.js')
const path = require('path')
const terser = require("terser-webpack-plugin")

const distDir = "dist"
const distPath = path.resolve(__dirname, distDir)

const defaultSettings = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minSize: 1,
          maxSize: Infinity,
          // name: false,
        }
      }
    },
    minimize: true,
    minimizer: [
      new terser({
        parallel: true,
        extractComments: false,
        terserOptions: {
          // Warnings: false,
          compress: {
            keep_infinity: true,
            passes: 2,
          },
          mangle: {
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
    path: distPath
  },
  plugins: []
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
