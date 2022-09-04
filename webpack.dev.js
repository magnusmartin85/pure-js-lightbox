const common = require("./webpack.common.js");
const paths = require("./paths");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: paths.dest.root,
    },
    compress: true,
    port: 9000,
  },
});
