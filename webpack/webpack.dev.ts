import "webpack-dev-server";
import webpack from "webpack";
import webpackCommon from "./webpack.common";
import { merge } from "webpack-merge";
import { paths } from "./paths";

const config: webpack.Configuration = merge(webpackCommon, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: [paths.src.scripts, `${paths.src.root}/index.html`],
    static: {
      directory: paths.src.root
    },
    compress: true,
    port: 9000
  }
});

export default config;
