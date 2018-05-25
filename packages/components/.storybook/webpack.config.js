const generateDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js")
const appConfig = require("../../app/webpack.config")

module.exports = (baseConfig, env) => {
  const config = generateDefaultConfig(baseConfig, env)
  config.resolve = appConfig.resolve
  config.module = {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
  ;(config.devtool = appConfig.devtool),
    Object.assign(config.output, {
      devtoolModuleFilenameTemplate:
        appConfig.output.devtoolModuleFilenameTemplate
    })

  return config
}
