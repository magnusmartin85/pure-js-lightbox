import "webpack-dev-server";
import * as webpack from "webpack";
import webpackCommon from "./webpack.common";
import { merge } from "webpack-merge";
import { paths } from "./paths";

const config: webpack.Configuration = merge(webpackCommon, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: paths.src.root,
    static: {
      directory: paths.dest.root
    },
    compress: true,
    port: 9000
  }
});
 
export default config;
