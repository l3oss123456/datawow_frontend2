// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader", // Make sure resolve-url-loader comes before sass-loader
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        runtimeErrors: false,
      },
    },
  },
};
