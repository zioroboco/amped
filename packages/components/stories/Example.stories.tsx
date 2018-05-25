import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Example } from "@amped/components"

storiesOf("Example", module).add('Goes "ding!"', () => {
  const props = {
    label: "click me",
    handler: () => console.log("ding!")
  }
  return <Example {...props} />
})
