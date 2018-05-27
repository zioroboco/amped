import * as React from "react"
import { SurveyResultDetail } from "@amped/types/src"
import { CircularProgress } from "@material-ui/core"

type SurveyDetailProps = { detail: {} | SurveyResultDetail | undefined }

/** The contents of the expanded query detail panel. */
const SurveyDetail = (props: SurveyDetailProps) => {
  if (
    props.detail === undefined ||
    props.detail["survey_result_detail"] === undefined
  ) {
    // Still waiting on the results...
    return <CircularProgress />
  }

  // The results are in!
  const detail = props.detail as SurveyResultDetail
  return (
    <div>{detail.survey_result_detail.submitted_response_count.toString()}</div>
  )
}

export { SurveyDetail, SurveyDetailProps }
