import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer as HotContainer } from "react-hot-loader"
import { App } from "./App"

export const render = (AppRoot: typeof App) => {
  ReactDOM.render(
    React.createElement(HotContainer, {}, React.createElement(AppRoot, {})),
    document.getElementById("root")
  )
}

render(App)

if (module.hot) {
  module.hot.accept()
}
