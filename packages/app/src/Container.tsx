import * as React from "react"
import { hot } from "react-hot-loader"
import { connect, Dispatch } from "react-redux"
import { asyncFetchDetail } from "./redux/actions"
import { State } from "./redux/store"
import { SurveyListProps } from "@amped/types"
import { SurveyList } from "@amped/components"

/** Signatures of handler functions which will dispatch actions to the store. */
type DispatchProps = {
  dispatchRequestDetailAtIndex: (index: number) => void
}

/** Once connected, keep the state prop updated with the store's state value. */
const mapStateToProps = (state: State) => ({ state })

/**
 * Once connected, provide the handler functions with the ability to dispatch
 * actions to the store (in this case, via an async action).
 */
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchRequestDetailAtIndex: index => asyncFetchDetail(index)(dispatch)
})

/**
 * A container component, providing the imported SurveyList component with
 * access to data and handler functions linked to the redux store.
 */
const Container = (props: SurveyListProps & DispatchProps) => {
  const surveyListProps: SurveyListProps = {
    state: props.state,
    handleRequestDetailAtIndex: props.dispatchRequestDetailAtIndex
  }
  return <SurveyList {...surveyListProps} />
}

// Mark the component exported as default as a hot-reloadable module
export default hot(module)(
  // Connect the component's data and handler functions to the redux store
  connect(mapStateToProps, mapDispatchToProps)(Container)
)

// Export the undecorated component for testing purposes
export { Container }
