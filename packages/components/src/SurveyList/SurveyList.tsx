import * as React from "react"
import {
  SurveyListProps,
  SurveyResultList,
  SurveyResult,
  SurveyResultDetail
} from "@amped/types"
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

type SurveyElementProps = {
  surveyResult: SurveyResult
  surveyDetail: {} | SurveyResultDetail | undefined
  index: number
  handleExpand: () => void
}

/** An individual survey result's summary with optional expanded detail. */
const SurveyElement = ({
  surveyResult,
  surveyDetail,
  index,
  handleExpand
}: SurveyElementProps) => {
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
const SurveyList = (props: SurveyListProps) => {
  const { state, handleRequestDetailAtIndex } = props

  // Choise of abstraction for the handler can be made in the context of the UI
  const makeExpandHandler = index => () => handleRequestDetailAtIndex(index)

  // Once the initial state has loaded...
  if (state.summary) {
    const surveyResults = state.summary.survey_results

    // Map list of survey results -> SurveyElement components
    const surveyElements = surveyResults.map((surveyResult, i) => {
      // Indices start at 1, for consistency with the API
      const index = i + 1

      // The specific detail object for this index (if it exists)
      const surveyDetail =
        state.details && index in state.details
          ? state.details[index]
          : undefined

      const surveyElementProps: SurveyElementProps = {
        handleExpand: makeExpandHandler(index),
        surveyResult,
        surveyDetail,
        index
      }
      return <SurveyElement {...surveyElementProps} key={index} />
    })

    // Render the list of survey element components
    return <div className={styles.root}>{surveyElements}</div>
  } else {
    return (
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    )
  }
}

export { SurveyList, SurveyListProps }
