const path = require("path");
const express = require("express");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware"); //webpack hot reloading middleware

const devConfig = require(path.resolve(__dirname,"../webpack.dev.js"));
const compiler = webpack(devConfig);

const app = express();

const indexFile = "../dev/index.html";

app.use(middleware(compiler, {
  index: indexFile,
  methods: ['GET','HEAD','POST','PUT','DELETE','CONNECT','OPTIONS','TRACE','PATCH'],
  headers: devConfig.devServer.headers,
  serverSideRender: false,
  writeToDisk: true,
}));

app.get('*', function(req, res){
  res.status(200).sendFile(path.resolve(__dirname, '../dev/index.html'));
});


app.listen(3000);
