import * as React from "react"
import { Example } from "./Example"

it("loads without error", () => {
  const example = <Example handler={jest.fn()} label="test-label" />
})
