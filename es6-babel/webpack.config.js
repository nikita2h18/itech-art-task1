const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-proposal-decorators",
                {
                  decoratorsBeforeExport: true,
                },
              ],
              ["@babel/plugin-syntax-dynamic-import"],
              [
                "@babel/plugin-proposal-pipeline-operator",
                {
                  proposal: "minimal",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
