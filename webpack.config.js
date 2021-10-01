const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const dependencies = require("./package.json").dependencies;

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
      shared: Object.keys(dependencies),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
