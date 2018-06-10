import * as React from "react"
import { renderIntoDocument, Simulate } from "react-testing-library"
import { SurveyResult } from "@amped/types"
import { SurveyList } from "."

const makeSurveyResult = (name: string): SurveyResult => ({
  name,
  participant_count: 1,
  response_rate: 1,
  url: ""
})

const makePropsWithSurveyResults = (results: SurveyResult[]) => ({
  handleRequestDetailAtIndex: clickHandler,
  state: {
    details: {},
    summary: {
      survey_results: results
    }
  }
})

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
    const surveyListItem = renderIntoDocument(
      <SurveyList {...props} />
    ).getByText(name)
    Simulate.click(surveyListItem)
    expect(clickHandler).toHaveBeenCalled()
  })
})
