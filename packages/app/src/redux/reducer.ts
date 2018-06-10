import { Reducer } from "redux"
import { State, initialState } from "./store"
import { isType } from "typescript-fsa"
import { RECEIVE_SUMMARY, REQUEST_DETAIL, RECEIVE_DETAIL } from "./actions"

const reducer: Reducer<State> = (state = initialState, action) => {
  // Receiving a summary (list of surveys) adds it as the summary object
  if (isType(action, RECEIVE_SUMMARY)) {
    const summary = action.payload
    return { ...state, summary }
  }

  // Requesting detail adds a placeholder object at the given detail index
  if (isType(action, REQUEST_DETAIL)) {
    const index = action.payload
    return {
      summary: state.summary,
      details: { ...state.details, [index]: {} }
    }
  }

  // Receiving detail substitutes in the detail data at the given index
  if (isType(action, RECEIVE_DETAIL)) {
    const { index, detail } = action.payload
    return {
      summary: state.summary,
      details: { ...state.details, [index]: detail }
    }
  }

  return state
}

export { reducer }
