const { HotModuleReplacementPlugin, NamedModulesPlugin } = require("webpack")
const { TsConfigPathsPlugin } = require("awesome-typescript-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const wdsConfig = { host: "localhost", port: 8080 }

module.exports = {
  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://${wdsConfig.host}:${wdsConfig.port}`,
    "webpack/hot/only-dev-server",
    path.join(__dirname, "src/index.tsx")
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["react-hot-loader/webpack", "awesome-typescript-loader"],
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
  devtool: "eval-source-map",
  output: {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    path: path.join(__dirname, ".build"),
    filename: "bundle.js"
  },
  devServer: {
    host: wdsConfig.host,
    port: wdsConfig.port,
    hot: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html")
    })
  ]
}
