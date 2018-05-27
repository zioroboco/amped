import { SurveyResultList, SurveyResultDetail } from "@amped/types"

/** Shape of the store object. */
type State = {
  readonly summary: SurveyResultList | undefined
  readonly details: {
    readonly [index: number]: SurveyResultDetail | {}
  }
}

/** Object used to initialise the store. */
const initialState = {
  summary: undefined,
  details: {}
}

export { State, initialState }
