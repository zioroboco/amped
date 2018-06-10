import * as React from "react"
import * as styles from "./SurveyDetail.css"

/** The mean value of all valid responses to a question. */
type AverageResponseStat = React.SFC<{
  sumOfResponses: number
  validResponseCount: number
}>

const AverageResponseStat: AverageResponseStat = ({
  sumOfResponses,
  validResponseCount
}) => (
  <div>
    {`Average response: `}
    <span className={styles.stat}>
      {validResponseCount
        ? (sumOfResponses / validResponseCount).toFixed(1)
        : `(none)`}
    </span>
  </div>
)

/** The fraction of a question's responses which were valid. */
type ParticipationRateStat = React.SFC<{
  totalResponseCount: number
  validResponseCount: number
}>

const ParticipationRateStat: ParticipationRateStat = ({
  totalResponseCount,
  validResponseCount
}) => (
  <div>
    {`Participation rate: `}
    <span className={styles.stat}>
      {`${Math.round(validResponseCount / totalResponseCount * 100)}%`}
    </span>
  </div>
)

/** A series of statistics summarising a question's responses in aggregate. */
type QuestionStats = React.SFC<{
  sumOfResponses: number
  totalResponseCount: number
  validResponseCount: number
}>

const QuestionStats: QuestionStats = ({
  sumOfResponses,
  totalResponseCount,
  validResponseCount
}) => (
  <div>
    <AverageResponseStat {...{ validResponseCount, sumOfResponses }} />
    <ParticipationRateStat {...{ validResponseCount, totalResponseCount }} />
  </div>
)

export { QuestionStats, ParticipationRateStat, AverageResponseStat }
