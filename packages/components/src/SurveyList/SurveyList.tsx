import * as React from "react"
import { Components, Data } from "@amped/types"
import { CircularProgress } from "@material-ui/core"
import { SurveyListElement, SurveyDetail } from "@amped/components"
import * as styles from "./SurveyList.css"

/**
 * The index offset of the data returned from the API. Currently starts
 * counting survey data items starting at 1.
 */
const DATA_INDEX_OFFSET = 1

/** A list of survey result summaries, expandable with additional detail. */
const SurveyList: Components.SurveyList = ({
  state,
  handleRequestDetailAtIndex
}) => {
  const makeExpandHandler = index => () => handleRequestDetailAtIndex(index)

  // If there's no data, show a spinner
  if (!state.summary) {
    return (
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    )
  }

  const surveyResults = state.summary.survey_results

  // Map the survey results data -> list of SurveyElement components
  const surveyElements = surveyResults.map((surveyResult, i) => {
    const index = i + DATA_INDEX_OFFSET
    const surveyDetail =
      state.details && index in state.details ? state.details[index] : undefined
    return (
      <SurveyListElement
        handleExpand={makeExpandHandler(index)}
        surveyResult={surveyResult}
        index={index}
        key={index}
      >
        <SurveyDetail detail={surveyDetail} />
      </SurveyListElement>
    )
  })

  return <div className={styles.root}>{surveyElements}</div>
}

export { SurveyList }
