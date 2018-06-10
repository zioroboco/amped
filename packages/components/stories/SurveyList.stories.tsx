import * as React from "react"
import { storiesOf } from "@storybook/react"
import { Data } from "@amped/types"
import { SurveyList } from "@amped/components"
import { detail } from "./SurveyDetail.stories"

const summary: Data.SurveyResultList = {
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

const handler = index => console.log(`Expanding ${index}`)

storiesOf("SurveyList", module)
  .add("Loading...", () => (
    <SurveyList
      state={{ summary: undefined, details: {} }}
      handleRequestDetailAtIndex={() => null}
    />
  ))

  .add("With Summaries", () => (
    <SurveyList
      state={{ details: {}, summary }}
      handleRequestDetailAtIndex={handler}
    />
  ))

  .add("With Summaries + Detail", () => {
    const state = { details: { 1: detail, 2: detail }, summary: summary }
    return <SurveyList state={state} handleRequestDetailAtIndex={handler} />
  })
