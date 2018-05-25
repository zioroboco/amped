import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { reducer } from "./reducer"
import { App } from "./App"

const store = createStore(reducer)

const render = (AppRoot: typeof App) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  )
}

render(App)

if (module.hot) {
  module.hot.accept()
}
