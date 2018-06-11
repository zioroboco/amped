import * as React from "react"
import { Data } from "@amped/types"
import { Typography, CircularProgress } from "@material-ui/core"
import * as styles from "./SurveyDetail.css"
import { uniq, filter, sum, length, sort, contains } from "ramda"
import { ResponseFrequencies } from "./ResponseFrequencies"
import { QuestionStats } from "./QuestionStats"

/** List of question response values to be discarded. */
const INVALID_RESPONSES = ["", "0"]

type Category = number
type Count = number

/** Maps a single answer category to its number of corresponding responses. */
type Frequency = [Category, Count]

/** A detailed description of the results for a given question. */
type Question = React.SFC<Data.SurveyQuestion>

const Question: Question = ({ description, survey_responses }) => {
  /** The list of responses as returned from the API. */
  const rawResponses = survey_responses

  /** List of responses as integers with invalid values dropped. */
  const cleanResponses: number[] = rawResponses
    .map(response => response.response_content)
    .filter(responseString => !contains(responseString, INVALID_RESPONSES))
    .map(validReponseString => parseInt(validReponseString))

  /** The sorted list of categories of received responses. */
  const categories = sort((a, b) => b - a, uniq(cleanResponses))

  /**
   * List of response frequencies, mapping responses to the correponding number
   * of answers counted with that response.
   */
  const responseFrequencies: Frequency[] = categories.map(
    (category): Frequency => [
      category,
      cleanResponses.filter(response => response === category).length
    ]
  )

  return (
    <div className={styles.question}>
      <Typography variant="headline">{description}</Typography>
      <Typography variant="subheading">
        <ResponseFrequencies
          frequencies={responseFrequencies}
          total={length(cleanResponses)}
        />
        <QuestionStats
          totalResponseCount={length(rawResponses)}
          validResponseCount={length(cleanResponses)}
          sumOfResponses={sum(cleanResponses)}
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

export { SurveyDetail, Frequency }
