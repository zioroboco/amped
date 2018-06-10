import * as React from "react"
import { Components, Data } from "@amped/types"
import {
  Typography,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import { SurveyDetail } from "@amped/components"
import * as styles from "./SurveyList.css"

/**
 * The index offset of the data returned from the API. Currently starts
 * counting survey data items starting at 1.
 */
const DATA_INDEX_OFFSET = 1

/** An individual survey result's summary with optional expanded detail. */
type SurveyElement = React.SFC<{
  surveyResult: Data.SurveyResult
  surveyDetail: {} | Data.SurveyResultDetail | undefined
  index: number
  handleExpand: () => void
}>

const SurveyElement: SurveyElement = ({
  surveyResult,
  surveyDetail,
  index,
  handleExpand
}) => {
  return (
    <ExpansionPanel key={index} onChange={handleExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography variant="title">{surveyResult.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <SurveyDetail detail={surveyDetail} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

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
      <SurveyElement
        handleExpand={makeExpandHandler(index)}
        surveyResult={surveyResult}
        surveyDetail={surveyDetail}
        index={index}
        key={index}
      />
    )
  })

  return <div className={styles.root}>{surveyElements}</div>
}

export { SurveyList }
