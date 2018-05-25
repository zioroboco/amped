const slsw = require("serverless-webpack")
const path = require("path")

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "inline-source-map",
  target: "node",
  resolve: {
    extensions: [".js", ".json", ".ts"]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      }
    ]
  }
}
