import { reducer } from "./reducer"
import { State } from "./store"
import { RECEIVE_SUMMARY, REQUEST_DETAIL, RECEIVE_DETAIL } from "./actions"
import { Data } from "@amped/types"

describe("reducer base case", () => {
  it("returns the existing state", () => {
    // Not strictly necessary -- this is accounted for by the type system!
    const initial: State = {
      summary: {} as Data.SurveyResultList,
      details: {}
    }
    expect(reducer(initial, { type: undefined })).toEqual(initial)
  })
})

describe("reducing the receive summary action", () => {
  it("returns state with the result list object added as the summary", () => {
    const actionPayload = {} as Data.SurveyResultList
    const initial: State = {
      summary: undefined,
      details: {}
    }
    const expected: State = {
      ...initial,
      summary: {} as Data.SurveyResultList
    }
    const actual: State = reducer(initial, RECEIVE_SUMMARY(actionPayload))
    expect(actual).toEqual(expected)
  })
})

describe("reducing the request detail action", () => {
  it("returns state with an empty object added to details at index", () => {
    const actionPayload = 2
    const initial: State = {
      summary: undefined,
      details: { 1: {} as Data.SurveyResultDetail }
    }
    const expected: State = {
      ...initial,
      details: {
        1: {} as Data.SurveyResultDetail,
        2: {} as Data.SurveyResultDetail
      }
    }
    const actual: State = reducer(initial, REQUEST_DETAIL(actionPayload))
    expect(actual).toEqual(expected)
  })
})

describe("reducing the receive detail action", () => {
  it("returns state with the detail object added to details at index", () => {
    const actionPayload = {
      index: 2,
      detail: { survey_result_detail: {} } as Data.SurveyResultDetail
    }
    const initial: State = {
      summary: undefined,
      details: { 1: { survey_result_detail: {} } as Data.SurveyResultDetail }
    }
    const expected: State = {
      ...initial,
      details: {
        1: { survey_result_detail: {} } as Data.SurveyResultDetail,
        2: { survey_result_detail: {} } as Data.SurveyResultDetail
      }
    }
    const actual: State = reducer(initial, RECEIVE_DETAIL(actionPayload))
    expect(actual).toEqual(expected)
  })
})
