import { SurveyResultList, SurveyResultDetail } from "./data"

export type SurveyListProps = {
  state: {
    summary: SurveyResultList | undefined
    detail: {
      [index: number]: SurveyResultDetail
    }
  }
  handleRequestDetailAtIndex: (index: number) => void
}
