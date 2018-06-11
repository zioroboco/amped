import * as React from "react"
import * as styles from "./SurveyDetail.css"
import { FrequencyMap } from "./SurveyDetail"
import { toPairs } from "ramda"

/** The percentage of total responses which were in a particular category. */
type PercentageOfResponses = React.SFC<{ count: number; total: number }>

const PercentageOfResponses: PercentageOfResponses = ({
  count,
  total
}): JSX.Element => (
  <span className={styles.percentage}>
    {`${Math.round(count / total * 100)}%`}
  </span>
)

/** The number of responses counted for a particular category. */
type NumberOfResponses = React.SFC<{ count: number }>

const NumberOfResponses: NumberOfResponses = ({ count }) => (
  <span className={styles.responseCount}>
    {`(${count} response${count > 1 ? "s" : ""})`}
  </span>
)

/** The response frequency list item corresponding to a single response. */
type FrequencyListItem = React.SFC<{
  responseCategory: string
  responseCount: number
  totalResponseCount: number
}>

const FrequencyListItem: FrequencyListItem = ({
  responseCategory,
  responseCount,
  totalResponseCount
}) => {
  return (
    <li key={responseCategory}>
      {`${responseCategory}: `}
      <PercentageOfResponses count={responseCount} total={totalResponseCount} />
      {` `}
      <NumberOfResponses count={responseCount} />
    </li>
  )
}

/** A list of the frequencies at which different responses were recorded. */
type ResponseFrequencies = React.SFC<{
  frequencies: FrequencyMap
  totalResponseCount: number
}>

const ResponseFrequencies: ResponseFrequencies = ({
  frequencies,
  totalResponseCount
}) => {
  const frequencyListItems = toPairs(frequencies)
    // warning: relies on JS coercion of string arguments to the < operator
    .sort(([catA], [catB]) => (catA < catB ? 1 : -1))
    .filter(([category, count]) => count > 0)
    .map(([category, count], i) => (
      <FrequencyListItem
        responseCategory={category}
        responseCount={count}
        totalResponseCount={totalResponseCount}
        key={i}
      />
    ))
  return <ul>{frequencyListItems}</ul>
}

export { ResponseFrequencies }
