import * as React from "react"
import {
  SurveyResultDetail,
  SurveyTheme,
  SurveyQuestion,
  SurveyQuestionResponse
} from "@amped/types"
import { Typography, CircularProgress } from "@material-ui/core"
import * as styles from "./SurveyDetail.css"

/** A series of statistics about a question's responses in aggregate. */
const QuestionStats = ({
  totalSumOfResponses,
  numberOfValidResponses,
  numberOfOverallResponses
}) => (
  <div>
    <div>
      {`Average response: `}
      <span className={styles.stat}>
        {`${
          numberOfValidResponses
            ? (totalSumOfResponses / numberOfValidResponses).toFixed(1)
            : "(none)"
        }`}
      </span>
    </div>
    <div>
      {`Participation rate: `}
      <span className={styles.stat}>
        {`${Math.round(
          numberOfValidResponses / numberOfOverallResponses * 100
        )}%`}
      </span>
    </div>
  </div>
)

/** A list of a question's response frequencies and totals. */
const QuestionFrequencies = ({ sums, total }) => (
  <ul>
    {sums.map(
      (sum, i) =>
        sum ? (
          <li key={i}>
            {`${5 - i}: `}
            <span className={styles.percentage}>
              {`${Math.round(sum / total * 100)}%`}
            </span>
            {` `}
            <span className={styles.responseCount}>
              {`(${sum} response${sum > 1 ? "s" : ""})`}
            </span>
          </li>
        ) : null
    )}
  </ul>
)

/** A detailed description of the results for a given question. */
const Question = (props: SurveyQuestion) => {
  const { description, survey_responses } = props

  /** List of responses as numbers with empty values dropped. */
  const cleanResponses: number[] = survey_responses
    .map(response => response.response_content)
    .filter(responseString => responseString)
    .map(nonZeroReponseString => parseInt(nonZeroReponseString))

  /** Possible answer values for questions. */
  const values = [5, 4, 3, 2, 1]

  /** The sum of question responses with a given value. */
  const sumsOfResponseValues = values.map(
    value => cleanResponses.filter(response => response === value).length
  )

  const numberOfValidResponses = cleanResponses.length
  const totalSumOfResponses = cleanResponses.reduce((total, n) => total + n, 0)

  return (
    <div className={styles.question}>
      <Typography variant="headline">{description}</Typography>
      <Typography variant="subheading">
        <QuestionFrequencies
          sums={sumsOfResponseValues}
          total={numberOfValidResponses}
        />
        <QuestionStats
          totalSumOfResponses={totalSumOfResponses}
          numberOfValidResponses={numberOfValidResponses}
          numberOfOverallResponses={survey_responses.length}
        />
      </Typography>
    </div>
  )
}

/** A list of the detailed results of questions with a given theme. */
const Theme = (props: SurveyTheme) => {
  const { name, questions } = props
  return (
    <div className={styles.theme}>
      <Typography variant="display1">{name}</Typography>
      {questions.map((question, i) => <Question {...question} key={i} />)}
    </div>
  )
}

type SurveyDetailProps = { detail: {} | SurveyResultDetail | undefined }

/** The contents of the expanded query detail panel. */
const SurveyDetail = (props: SurveyDetailProps) => {
  if (
    props.detail === undefined ||
    props.detail["survey_result_detail"] === undefined
  ) {
    // Still waiting on the results...
    return <CircularProgress className={styles.spinner} />
  }

  // The results are in!
  const detail = props.detail as SurveyResultDetail
  const { themes } = detail.survey_result_detail
  return <div>{themes.map((theme, i) => <Theme {...theme} key={i} />)}</div>
}

export { SurveyDetail, SurveyDetailProps }
