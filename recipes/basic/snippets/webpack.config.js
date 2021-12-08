function getWebPackConfig(appName, { sourceDir, buildDir, portNumber }) {
  return `
const webpack = require("webpack");
const path = require("path");
const PACKAGE = require("./package.json");

// WebPack Plugins.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./${sourceDir.main}/index.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [/node_modules/],
        use: ["babel-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
    alias: {
      "@${appName}/${sourceDir.i18n}": path.resolve(__dirname, "${sourceDir.main}", "${sourceDir.i18n}"),
      "@${appName}/${sourceDir.images}": path.resolve(
        __dirname,
        "${sourceDir.main}",
        "${sourceDir.static}",
        "${sourceDir.assets}",
        "${sourceDir.images}"
      ),
      "@${appName}/${sourceDir.userInterface}": path.resolve(
        __dirname,
        "${sourceDir.main}",
        "${sourceDir.components}",
        "${sourceDir.userInterface}"
      ),
      "@${appName}/${sourceDir.businessLogic}": path.resolve(
        __dirname,
        "${sourceDir.main}",
        "${sourceDir.components}",
        "${sourceDir.businessLogic}"
      ),
      "@${appName}/${sourceDir.utility}": path.resolve(__dirname, "${sourceDir.main}", "${sourceDir.utility}"),
    },
  },
  output: {
    path: path.resolve(__dirname, "${buildDir}"),
    filename: "${appName}.js",
    chunkFilename: "[name].js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.EnvironmentPlugin({
      VERSION: PACKAGE.version,
    }),

    // Take Reference of HTML File.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "${sourceDir.main}/${sourceDir.static}/index.html"),
      APP_ROOT_ID: '${appName}',
      APP_VERSION: PACKAGE.version
    }),

    // Copy all Assets, Icons to public Folder.
    new CopyPlugin({
      patterns: [
        { from: "./${sourceDir.main}/${sourceDir.static}/${sourceDir.images}", to: "images" },
        {
          from: "./${sourceDir.main}/${sourceDir.static}/${sourceDir.locales}/en.json",
          to: "${sourceDir.locales}/en.json",
        },
      ],
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
    static: {
      directory: "./${sourceDir.main}/${sourceDir.static}",
    },
    hot: true,
    port: ${portNumber},
    proxy: {
      "/api": "http://YOUR_API_URL:9000",
    },
  },
};    
`;
}

module.exports = {
  getWebPackConfig,
};
