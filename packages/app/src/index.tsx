import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, Middleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { initialState } from "./redux/store"
import { reducer } from "./redux/reducer"
import thunk from "redux-thunk"
import { asyncFetchSummary } from "./redux/actions"
import Container from "./Container"

/** The redux store. */
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

// Request the initial app state and dispatch to the store
asyncFetchSummary()(store.dispatch)

/** Renders the component tree into a hapless DOM node. */
const render = AppRoot => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  )
}

// Where the magic happens...
render(Container)

// Where *literal* magic happens:
if (module.hot) {
  module.hot.accept("./Container", () => {
    render(Container)
  })
  module.hot.accept("./redux/reducer", () => {
    store.replaceReducer(reducer)
  })
}
