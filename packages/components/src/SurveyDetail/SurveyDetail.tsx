import * as React from "react"
import { Data } from "@amped/types"
import { Typography, CircularProgress } from "@material-ui/core"
import * as styles from "./SurveyDetail.css"
import { filter, sum, length, sort, contains, reduce, map } from "ramda"
import { ResponseFrequencies } from "./ResponseFrequencies"
import { QuestionStats } from "./QuestionStats"

/** List of valid response categories. Could be returned from the API. */
const VALID_RESPONSES = ["5", "4", "3", "2", "1"]

/** Maps answer categories to their number of corresponding responses. */
type FrequencyMap = { [category: string]: number }

/** A detailed description of the results for a given question. */
type Question = React.SFC<
  Data.SurveyQuestion & { responseCategories?: string[] }
>

const Question: Question = ({
  description,
  survey_responses,
  responseCategories = VALID_RESPONSES
}) => {
  /** The list of responses as returned from the API. */
  const rawResponses = survey_responses

  /** List of responses as integers with invalid values dropped. */
  const cleanResponses: string[] = rawResponses
    .map(response => response.response_content)
    .filter(responseString => contains(responseString, responseCategories))

  /**
   * The response categories and corresponding response counts reduced to a
   * FrequencyMap object.
   */
  const frequencies: FrequencyMap = reduce<string, FrequencyMap>(
    (frequencies, category) => ({
      ...frequencies,
      [category]: length(
        cleanResponses.filter(response => response === category)
      )
    }),
    {} as FrequencyMap,
    responseCategories
  )

  return (
    <div className={styles.question}>
      <Typography variant="headline">{description}</Typography>
      <Typography variant="subheading">
        <ResponseFrequencies
          frequencies={frequencies}
          totalResponseCount={length(cleanResponses)}
        />
        <QuestionStats
          totalResponseCount={length(rawResponses)}
          validResponseCount={length(cleanResponses)}
          sumOfResponses={sum(map(parseInt, cleanResponses))}
        />
      </Typography>
    </div>
  )
}

/** A list of the detailed results of questions with a given theme. */
type Theme = React.SFC<Data.SurveyTheme>

const Theme: Theme = ({ name, questions }) => {
  const questionElements: JSX.Element[] = questions.map((question, i) => (
    <Question {...question} key={i} />
  ))

  return (
    <div className={styles.theme}>
      <Typography variant="display1">{name}</Typography>
      {questionElements}
    </div>
  )
}

/** An panel with theme and question details for a given survey. */
type SurveyDetail = React.SFC<{
  detail: {} | Data.SurveyResultDetail | undefined
}>

const SurveyDetail: SurveyDetail = ({ detail }) => {
  // Render a spinner while we're waiting for data...
  if (detail === undefined || detail["survey_result_detail"] === undefined) {
    return <CircularProgress className={styles.spinner} />
  }

  // The results are in...
  const { themes } = (detail as Data.SurveyResultDetail).survey_result_detail

  // Return a list of theme elements
  const themeElements: JSX.Element[] = themes.map((theme, i) => (
    <Theme {...theme} key={i} />
  ))

  return <div>{themeElements}</div>
}

export { SurveyDetail, FrequencyMap }
