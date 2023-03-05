const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
import * as webpack from "webpack";
import webpackCommon from "./webpack.common";

const config: webpack.Configuration = merge(webpackCommon, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
});

export default config;
