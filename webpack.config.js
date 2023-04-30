// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const webpack = require('webpack');

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "dist"),
  },
  // devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // minify: {
      //   collapseWhitespace: true
      // }
    }),
    new webpack.ProvidePlugin({
      ss: 'simple-statistics'
    }),
    new webpack.ProvidePlugin({
      math: 'math.js'
    }),
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  externals: {
    'arcgis-js-api': 'arcgis',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};


module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};