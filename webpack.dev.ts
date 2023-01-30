import "webpack-dev-server";
import * as webpack from "webpack";
import webpackCommon from "./webpack.common";
import { merge } from "webpack-merge";
import { paths } from "./paths";

const config: webpack.Configuration = merge(webpackCommon, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: paths.dest.root
    },
    compress: true,
    port: 9000
  }
});

export default config;
