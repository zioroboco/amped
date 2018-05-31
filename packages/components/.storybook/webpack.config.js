const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path")

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = [
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
            localIdentName: "[name]__[local]"
          }
        }
      ]
    }
  ]
  defaultConfig.resolve.plugins = [
    new TsConfigPathsPlugin({
      configFile: path.resolve(__dirname, "../tsconfig.json")
    })
  ]
  defaultConfig.resolve.extensions.push(".ts", ".tsx")
  return defaultConfig
}
