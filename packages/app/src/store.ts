import { SurveyResultList, SurveyResultDetail } from "@amped/types"

type State = {
  readonly results: SurveyResultList | undefined
  readonly details: {
    readonly [index: number]: SurveyResultDetail
  }
}

const initialState = {
  results: undefined,
  details: []
}

export { State, initialState }
