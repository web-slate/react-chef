function getWebPackConfig(appName, { sourceDir, buildDir, portNumber }) {
  return `
const webpack = require("webpack");
const path = require("path");
const PACKAGE = require("./package.json");

// WebPack Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./${sourceDir.main}/index.tsx",

  module: {
    rules: [
      {
        test: /\\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\\.svg$/,
        use: ["@svgr/webpack", "file-loader"],
      },
      {
        test: /\\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".*", ".js", ".ts", ".tsx"],
    alias: {
          "@": path.resolve(__dirname, "src"),
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
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "${sourceDir.main}/${sourceDir.static}/index.html"),
      APP_ROOT_ID: "${appName}",
      APP_VERSION: PACKAGE.version,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./${sourceDir.main}/${sourceDir.static}/${sourceDir.images}",
          to: "images",
        },
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
      directory: path.resolve(__dirname, "${sourceDir.main}/${sourceDir.static}"),
    },
    hot: true,
    port: ${portNumber},
    proxy: [
      {
        context: ["/api"], // list of paths to proxy
        target: "http://YOUR_API_URL:9000",
        changeOrigin: true,
        secure: false, // optional: allows self-signed certificates
      },
    ],
  },
};
`;
}

module.exports = {
  getWebPackConfig,
};
