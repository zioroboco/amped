import * as React from "react"
import * as styles from "./SurveyDetail.css"
import { FrequencyMap } from "./SurveyDetail"
import { toPairs } from "ramda"

/** Tuple representing a single answer category and its number of responses. */
type Frequency = [number, number]

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
type FrequencyListItem = React.SFC<{ frequency: Frequency; total: number }>

const FrequencyListItem: FrequencyListItem = ({ frequency, total }) => {
  const [category, count] = frequency
  return (
    <li key={category}>
      {`${category}: `}
      <PercentageOfResponses count={count} total={total} />
      {` `}
      <NumberOfResponses count={count} />
    </li>
  )
}

/** A list of the frequencies at which different responses were recorded. */
type ResponseFrequencies = React.SFC<{
  frequencies: FrequencyMap
  total: number
}>

const ResponseFrequencies: ResponseFrequencies = ({ frequencies, total }) => {
  const frequencyListItems = toPairs(frequencies)
    .sort(([a], [b]) => b - a)
    .map((frequency, i) => (
      <FrequencyListItem frequency={frequency} total={total} key={i} />
    ))
  return <ul>{frequencyListItems}</ul>
}

export { ResponseFrequencies }
