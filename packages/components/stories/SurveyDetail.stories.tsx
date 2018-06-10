import * as React from "react"
import { storiesOf } from "@storybook/react"
import { SurveyResultDetail } from "@amped/types"
import { SurveyDetail } from "@amped/components"

export const detail: SurveyResultDetail = {
  survey_result_detail: {
    name: "Basic Existentialism",
    participant_count: 2,
    response_rate: 0.5,
    submitted_response_count: 4,
    url: "",
    themes: [
      {
        name: "Subconscious",
        questions: [
          {
            description:
              "Do your episodes of non-specific malaise affect your work?",
            question_type: "ratingquestion",
            survey_responses: [
              {
                id: 1,
                question_id: 1,
                respondent_id: 1,
                response_content: "4"
              },
              {
                id: 2,
                question_id: 1,
                respondent_id: 2,
                response_content: "3"
              }
            ]
          },
          {
            description: "How frequent are your indescribable night terrors?",
            question_type: "ratingquestion",
            survey_responses: [
              {
                id: 3,
                question_id: 2,
                respondent_id: 1,
                response_content: "5"
              },
              {
                id: 4,
                question_id: 2,
                respondent_id: 2,
                response_content: ""
              }
            ]
          }
        ]
      },
      {
        name: "Conscious",
        questions: [
          {
            description: "Well? Are you?",
            question_type: "ratingquestion",
            survey_responses: [
              {
                id: 5,
                question_id: 3,
                respondent_id: 1,
                response_content: ""
              },
              {
                id: 2,
                question_id: 3,
                respondent_id: 2,
                response_content: ""
              }
            ]
          }
        ]
      }
    ]
  }
}

storiesOf("SurveyDetail", module)
  .add("Loading...", () => <SurveyDetail detail={{}} />)

  .add("With Detail", () => <SurveyDetail detail={detail} />)
