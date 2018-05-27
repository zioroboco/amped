import { SurveyResultList, SurveyResultDetail } from "./data"

export type SurveyListProps = {
  state: {
    summary: SurveyResultList | undefined
    details: {
      [index: number]: SurveyResultDetail
    }
  }
  handleRequestDetailAtIndex: (index: number) => void
}
