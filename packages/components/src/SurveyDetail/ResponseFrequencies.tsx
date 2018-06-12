import * as React from "react"
import * as styles from "./SurveyDetail.css"
import { FrequencyMap } from "./SurveyDetail"
import { toPairs } from "ramda"
import { Button } from "@material-ui/core"

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

type ResponseFrequenciesProps = {
  frequencies: FrequencyMap
  totalResponseCount: number
}

enum SortMethod {
  category = "category",
  count = "count"
}

type ResponseFrequenciesState = {
  sortMethod: SortMethod
}

/** A list of the frequencies at which different responses were recorded. */
class ResponseFrequencies extends React.Component<
  ResponseFrequenciesProps,
  ResponseFrequenciesState
> {
  constructor(props: ResponseFrequenciesProps) {
    super(props)
    this.state = {
      sortMethod: SortMethod.category
    }
  }

  toggleSortMethod = () =>
    this.setState({
      sortMethod:
        this.state.sortMethod === SortMethod.count
          ? SortMethod.category
          : SortMethod.count
    })

  render(): JSX.Element {
    const frequencyListItems = toPairs(this.props.frequencies)
      .sort(
        this.state.sortMethod === SortMethod.count
          ? sortByCount
          : sortByCategory
      )
      .filter(([category, count]) => count > 0)
      .map(([category, count], i) => (
        <FrequencyListItem
          responseCategory={category}
          responseCount={count}
          totalResponseCount={this.props.totalResponseCount}
          key={i}
        />
      ))

    return (
      <div>
        <Button
          className={styles.toggleSort}
          onClick={this.toggleSortMethod}
        >{`Sort by response ${
          this.state.sortMethod === SortMethod.count
            ? SortMethod.category
            : SortMethod.count
        }`}</Button>
        <ul>{frequencyListItems}</ul>
      </div>
    )
  }
}

const sortByCategory = (a, b) => (b[0] < a[0] ? -1 : 1)
const sortByCount = (a, b) => (b[1] < a[1] ? -1 : 1)

export { ResponseFrequencies }
