import * as React from "react"
import { storiesOf } from "@storybook/react"
import { SurveyList } from "@amped/components"

storiesOf("SurveyList", module).add("Basic", () => {
  return <SurveyList />
})
