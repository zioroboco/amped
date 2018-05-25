import * as React from "react"

type ExampleProps = {
  handler: () => void
  label: string
}

const Example = (props: ExampleProps) => (
  <button onClick={props.handler}>{props.label}</button>
)

export { Example }
