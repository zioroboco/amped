import * as React from "react"
import { SurveyListProps, SurveyResultList, SurveyResult } from "@amped/types"
import {
  Typography,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core"
import * as styles from "./SurveyList.css"

/** An individual survey result summary and optional expanded detail. */
const SurveyElement = ({ result, index }) => {
  return (
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary>
        <Typography>{result.name}</Typography>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  )
}

/** A list of survey result summaries, expandable with additional detail. */
const SurveyList = (props: SurveyListProps) => {
  const { state, handleRequestDetailAtIndex } = props
  if (state.summary) {
    const surveyResults = state.summary.survey_results
    const surveyElement = surveyResults.map((result, i) => (
      // Indices start at 1, for consistency with the API data
      <SurveyElement result={result} index={i + 1} key={i} />
    ))
    return <div className={styles.root}>{surveyElement}</div>
  } else {
    return (
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    )
  }
}

export { SurveyList }
