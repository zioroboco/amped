import { Data } from "@amped/types"

/** Shape of the store object. */
type State = {
  readonly summary: Data.SurveyResultList | undefined
  readonly details: {
    readonly [index: number]: Data.SurveyResultDetail | {}
  }
}

/** Object used to initialise the store. */
const initialState = {
  summary: undefined,
  details: {}
}

export { State, initialState }
