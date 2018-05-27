const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const DotEnv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const { DefinePlugin } = require("webpack")
const path = require("path")

module.exports = {
  entry: [path.join(__dirname, "src/index.tsx")],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"],
        include: path.join(__dirname, "..")
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsConfigPathsPlugin()]
  },
  output: {
    path: path.resolve(__dirname, ".build"),
    filename: "bundle.js"
  },
  plugins: [
    new DotEnv({
      systemvars: true,
      path: path.join(__dirname, "../../.env")
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html")
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new UglifyJsPlugin()
  ]
}
