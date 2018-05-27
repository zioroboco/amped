import * as React from "react"
import { SurveyListProps } from "@amped/types"
import { SurveyList } from "."

const baseProps: SurveyListProps = {
  state: {
    summary: undefined,
    details: {}
  },
  handleRequestDetailAtIndex: () => null
}

it("loads without error", () => {
  const component = <SurveyList {...baseProps} />
})
