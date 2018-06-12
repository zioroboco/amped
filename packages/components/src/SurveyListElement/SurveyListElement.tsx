import * as React from "react"
import {
  Typography,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import { Data } from "@amped/types"
import { SurveyDetail } from "@amped/components"

/** An individual survey result's summary with optional expanded detail. */
type SurveyListElement = React.SFC<{
  surveyResult: Data.SurveyResult
  index: number
  handleExpand: () => void
}>

const SurveyListElement: SurveyListElement = ({
  children,
  surveyResult,
  index,
  handleExpand
}) => {
  return (
    <ExpansionPanel key={index} onChange={handleExpand}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography variant="title">{surveyResult.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export { SurveyListElement }
