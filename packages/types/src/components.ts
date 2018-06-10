import { SFC } from "react"
import { Data } from "./data"

export namespace Components {
  export type SurveyList = React.SFC<{
    state: {
      summary: Data.SurveyResultList | undefined
      details: {
        [index: number]: Data.SurveyResultDetail
      }
    }
    handleRequestDetailAtIndex: (index: number) => void
  }>
}
