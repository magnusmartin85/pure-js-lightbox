import CopyPlugin = require("copy-webpack-plugin");
import ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
import webpack from "webpack";
import { paths } from "./paths";

const config: webpack.Configuration = {
  stats: {
    errorDetails: true
  },
  entry: paths.src.js + "/index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.src.assets + "/loading-animation.svg",
          to: ""
        },
        {
          from: paths.src.templates,
          to: "templates"
        },
        {
          from: paths.src.root + "/index.html",
          to: ""
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset"
      },
      {
        test: /\.(ttf)$/,
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        generator: [
          {
            type: "asset",
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              resize: {
                enabled: true,
                width: 1024
              },
              encodeOptions: {
                jpg: {
                  quality: 90
                }
              }
            }
          }
        ]
      }),
      new ImageMinimizerPlugin({
        generator: [
          {
            filename: () => "preview-[name][ext]",
            preset: "preview",
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              resize: {
                enabled: true,
                width: 300,
                height: 200
              },
              encodeOptions: {
                jpg: {
                  quality: 10
                }
              }
            }
          }
        ]
      })
    ]
  },
  output: {
    filename: "pure-js-lightbox.js",
    clean: true,
    path: paths.dest.root
  }
};

export default config;
