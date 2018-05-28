import * as React from "react"
import { render, renderIntoDocument } from "react-testing-library"
import { SurveyListProps, SurveyResult } from "@amped/types"
import { SurveyList } from "."

const makeSurveyResult = (name: string): SurveyResult => {
  return {
    name,
    participant_count: 1,
    response_rate: 1,
    url: ""
  }
}

const makePropsWithSurveyResults = (
  results: SurveyResult[]
): SurveyListProps => {
  return {
    handleRequestDetailAtIndex: clickHandler,
    state: {
      details: {},
      summary: {
        survey_results: results
      }
    }
  }
}

const clickHandler = jest.fn()

describe("entry in the list of survey summaries", () => {
  beforeEach(() => jest.clearAllMocks())

  it("renders the survey name", () => {
    const name = "test-name"
    const props = makePropsWithSurveyResults([makeSurveyResult(name)])
    const container = renderIntoDocument(<SurveyList {...props} />)
    expect(container.getByText(name)).toBeTruthy()
  })

  it("renders multiple survey titles", () => {
    const names = ["test-name-one", "test-name-two"]
    const props = makePropsWithSurveyResults(
      names.map(name => makeSurveyResult(name))
    )
    const container = renderIntoDocument(<SurveyList {...props} />)
    names.forEach(name => expect(container.getByText(name)).toBeTruthy())
  })

  it("calls request detail handler when clicked", () => {
    const name = "test-name"
    const props = makePropsWithSurveyResults([makeSurveyResult(name)])
    renderIntoDocument(<SurveyList {...props} />)
      .getByText(name)
      .click()
    expect(clickHandler).toHaveBeenCalled()
  })
})
