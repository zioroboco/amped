const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const DotEnv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "production",
  entry: [path.join(__dirname, "src/index.ts")],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "babel-plugin-syntax-typescript",
                "babel-plugin-syntax-decorators",
                "babel-plugin-syntax-jsx"
              ]
            }
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
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
    new UglifyJsPlugin()
  ]
}
