import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import { paths } from "./paths";

const config: webpack.Configuration = {
  stats: {
    errorDetails: true
  },
  entry: paths.src.scripts + "/index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.src.assets + "/loading-animation.svg",
          to: paths.dest.root
        },
        {
          from: paths.src.root + "/index.html",
          to: paths.dest.root
        }
      ]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ttf)$/,
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "pure-js-lightbox.css"
        },
        use: ["sass-loader"]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "pure-js-lightbox.js",
    clean: true,
    path: paths.dest.root
  }
};

export default config;
