import * as React from "react"
import * as styles from "./Example.css"

type ExampleProps = {
  handler: () => void
  label: string
}

const Example = (props: ExampleProps) => (
  <button className={styles.amazing} onClick={props.handler}>
    {props.label}
  </button>
)

export { Example }
