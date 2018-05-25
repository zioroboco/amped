import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Example } from "../src/Example"

storiesOf("Example", module).add('Goes "ding!"', () => {
  const props = {
    label: "click me",
    handler: () => console.log("ding!")
  }
  return <Example {...props} />
})
