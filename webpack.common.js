const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const paths = require("./paths");

module.exports = {
  stats: {
    errorDetails: true,
  },
  entry: paths.src.js + "/index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.src.templates,
          to: "templates",
        },
        {
          from: paths.src.root + "/index.html",
          to: "",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(ttf)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
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
                width: 1000,
                height: 667,
              },
              encodeOptions: {
                jpg: {
                  quality: 90,
                },
              },
            },
          },
        ],
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
                height: 200,
              },
              encodeOptions: {
                jpg: {
                  quality: 10,
                },
              },
            },
          },
        ],
      }),
    ],
  },
  output: {
    filename: "pure-js-lightbox.js",
    path: paths.dest.root,
  },
};
