// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // devServer: {
  //   open: true,
  //   host: "localhost",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
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
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};


// module.exports = () => {
//   if (isProduction) {
//     config.mode = "production";

//     config.plugins.push(new MiniCssExtractPlugin());

//     config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
//   } else {
//     config.mode = "development";
//   }
//   return config;
// };


module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const config = {
    // your other configuration settings
    devtool: false,
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      // your other plugins
      isProduction && new MiniCssExtractPlugin(),
      isProduction && new WorkboxWebpackPlugin.GenerateSW(),
    ].filter(Boolean),
  };

  return config;
};
