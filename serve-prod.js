const path = require("path");
const express = require("express");
const webpack = require("webpack");

const prodConfig = require(path.resolve(__dirname,"webpack.prod.js"));
const compiler = webpack(prodConfig);

const app = express();

const indexFile = path.join(__dirname,"dist","index.html");

// app.use(express.static(indexFile));

// serve static assets normally
app.use(express.static(path.join(__dirname,"dist")));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, indexFile));
});

app.listen(3000);
