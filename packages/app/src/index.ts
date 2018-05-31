import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, Middleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { initialState } from "./redux/store"
import { reducer } from "./redux/reducer"
import { asyncFetchSummary } from "./redux/actions"
import Container from "./Container"

/** The redux store. */
const store = createStore(reducer, initialState, composeWithDevTools())

// Request the initial app state and dispatch to the store
asyncFetchSummary()(store.dispatch)

/** Renders the component tree into a hapless DOM node. */
const render = AppRoot => {
  ReactDOM.render(
    React.createElement(Provider, { store }, React.createElement(AppRoot)),
    document.getElementById("root")
  )
}

// Where the magic happens...
render(Container)
