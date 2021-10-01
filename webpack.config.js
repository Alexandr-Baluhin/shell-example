const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "shell.js",
    path: path.resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      webSocketURL: {
        hostname: "localhost",
      },
    },
    allowedHosts: "all",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: [{ "single-spa": { singleton: true } }],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
