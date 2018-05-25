import * as React from "react"
import { Example } from "@amped/components"

const App = (): JSX.Element => (
  <div style={{ textAlign: "center" }}>
    <div style={{ margin: "6rem", fontSize: "12rem" }}>⚡️</div>
    <Example
      handler={() => console.log("production-ready ding!")}
      label="click me 😐"
    />
  </div>
)

export { App }
