import * as React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { SurveyListProps, SurveyResultList } from "@amped/types"
import { SurveyList } from "@amped/components"

const props: SurveyListProps = {
  state: { summary: undefined, detail: {} },
  handleRequestDetailAtIndex: () => null
}

const summary: SurveyResultList = {
  survey_results: [
    {
      name: "Basic Existentialism",
      participant_count: 1,
      response_rate: 1,
      url: ""
    },
    {
      name: "Deeper Cosmic Futility",
      participant_count: 1,
      response_rate: 1,
      url: ""
    }
  ]
}

storiesOf("SurveyList", module)
  .add("Loading...", () => {
    const props: SurveyListProps = {
      state: { summary: undefined, detail: {} },
      handleRequestDetailAtIndex: () => null
    }
    return <SurveyList {...props} />
  })

  .add("With Summaries", () => {
    return (
      <SurveyList
        state={{ detail: {}, summary }}
        handleRequestDetailAtIndex={() => null}
      />
    )
  })
