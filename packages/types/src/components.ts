import { SFC } from "react"
import { SurveyResultList, SurveyResultDetail } from "./data"

export namespace Components {
  export type SurveyList = React.SFC<{
    state: {
      summary: SurveyResultList | undefined
      details: {
        [index: number]: SurveyResultDetail
      }
    }
    handleRequestDetailAtIndex: (index: number) => void
  }>
}
