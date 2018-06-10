import * as React from "react"
import { render } from "react-testing-library"
import { SurveyDetail } from "."

const expectedTheme = "test-theme"
const expectedQuestion = "test-description"
const expectedReponses = ["4", "3"]
const expectedAverages = ["3.5", "(none)"]
const expectedParticipationRates = ["100%", "0%"]

const props = {
  detail: {
    survey_result_detail: {
      themes: [
        {
          name: expectedTheme,
          questions: [
            {
              description: expectedQuestion,
              survey_responses: [
                { response_content: expectedReponses[0] },
                { response_content: expectedReponses[1] }
              ]
            }
          ]
        },
        {
          questions: [{ survey_responses: [{ response_content: "" }] }]
        }
      ]
    }
  }
}

describe("detail of a survey result", () => {
  const container = render(<SurveyDetail {...props} />)

  it("renders a theme", () => {
    expect(container.getByText(expectedTheme)).toBeTruthy()
  })

  it("renders a question", () => {
    expect(container.getByText(expectedQuestion)).toBeTruthy()
  })

  it("renders question response summaries", () => {
    expectedReponses.forEach(response =>
      expect(container.getByText(`${response}:`)).toBeTruthy()
    )
  })

  it("renders the response average to one decimal place (unless NaN)", () => {
    expectedAverages.forEach(average =>
      expect(container.getByText(average)).toBeTruthy()
    )
  })

  it("renders the participation rate as a percentage", () => {
    expectedParticipationRates.forEach(participationRate =>
      expect(container.getByText(participationRate)).toBeTruthy()
    )
  })
})
