import * as React from "react"
import { hot } from "react-hot-loader"
import { connect, Dispatch } from "react-redux"
import { asyncFetchDetail } from "./redux/actions"
import { State } from "./redux/store"
import { SurveyList } from "@amped/components"

/** Once connected, keep the state prop updated with the store's state value. */
const mapStateToProps = (state: State) => ({ state })

/**
 * Once connected, provide the handler functions with the ability to dispatch
 * actions to the store (in this case, via an async action).
 */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchRequestDetailAtIndex: index => asyncFetchDetail(index)(dispatch)
})

/**
 * A container component, providing the imported SurveyList component with
 * access to data and handler functions linked to the redux store.
 */
const Container = ({ state, dispatchRequestDetailAtIndex }) => (
  <SurveyList
    state={state}
    handleRequestDetailAtIndex={dispatchRequestDetailAtIndex}
  />
)

// Mark the component exported as default as a hot-reloadable module
export default hot(module)(
  // Connect the component's data and handler functions to the redux store
  connect(mapStateToProps, mapDispatchToProps)(Container)
)

// Export the undecorated component for testing purposes
export { Container }
