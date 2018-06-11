import * as React from "react"
import * as styles from "./SurveyDetail.css"
import { Frequency } from "./SurveyDetail"

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
  frequencies: Frequency[]
  total: number
}>

const ResponseFrequencies: ResponseFrequencies = ({ frequencies, total }) => {
  const frequencyListItems = (frequencies: Frequency[]) =>
    frequencies.map((frequency, i) => {
      return <FrequencyListItem frequency={frequency} total={total} key={i} />
    })
  return <ul>{frequencyListItems(frequencies)}</ul>
}

export { ResponseFrequencies }
