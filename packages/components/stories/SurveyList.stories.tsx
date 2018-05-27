import * as React from "react"
import { storiesOf } from "@storybook/react"
import { SurveyListProps } from "@amped/types"
import { SurveyList } from "@amped/components"

const baseProps: SurveyListProps = {
  state: {
    summary: undefined,
    detail: {}
  },
  handleRequestDetailAtIndex: () => null
}

storiesOf("SurveyList", module).add("Basic", () => {
  return <SurveyList {...baseProps} />
})
