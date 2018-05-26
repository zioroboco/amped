import { Reducer } from "redux"
import { State, initialState } from "./store"

const reducer: Reducer<State> = (state = initialState, action) => state

export { reducer }
