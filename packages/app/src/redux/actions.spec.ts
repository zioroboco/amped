import {
  asyncFetchDetail,
  asyncFetchSummary,
  RECEIVE_DETAIL,
  RECEIVE_SUMMARY,
  REQUEST_DETAIL
} from "./actions"
import { Data } from "@amped/types"

const endpoint = "test-endpoint"
const fetch = jest.fn()
const dispatch = jest.fn()

afterEach(() => jest.resetAllMocks())

describe("async fetch summary action", () => {
  const surveyResultList = { survey_results: [] } as Data.SurveyResultList

  beforeEach(() => {
    fetch.mockImplementation(
      resource =>
        new Promise((resolve, reject) =>
          resolve({ json: () => surveyResultList })
        )
    )
  })

  it("fetches from the mock endpoint", () => {
    asyncFetchSummary(endpoint, fetch)(dispatch)
    expect(fetch).toBeCalledWith(endpoint)
  })

  it("dispatches RECEIVE_SUMMARY with data returned from fetch", async () => {
    await asyncFetchSummary(endpoint, fetch)(dispatch)
    expect(dispatch).toBeCalledWith(RECEIVE_SUMMARY(surveyResultList))
  })
})

describe("async fetch detail action", () => {
  const surveyDetail = { survey_result_detail: {} } as Data.SurveyResultDetail
  const indices = [1, 2]

  beforeEach(() => {
    fetch.mockImplementation(
      resource =>
        new Promise((resolve, reject) => resolve({ json: () => surveyDetail }))
    )
  })

  it("fetches the specified resource from the mock endpoint", () => {
    indices.forEach(index => {
      asyncFetchDetail(index, endpoint, fetch)(dispatch)
      expect(fetch).toBeCalledWith(`${endpoint}/${index}`)
    })
  })

  it("dispatches REQUEST_DETAIL immediately with the requested index", () => {
    indices.forEach(index => {
      asyncFetchDetail(index, endpoint, fetch)(dispatch)
      expect(dispatch).toBeCalledWith(REQUEST_DETAIL(index))
    })
  })

  it("dispatches RECEIVE_DETAIL with data returned from fetch", () => {
    expect.assertions(indices.length)
    indices.forEach(async index => {
      await asyncFetchDetail(index, endpoint, fetch)(dispatch)
      expect(dispatch).toBeCalledWith(
        RECEIVE_DETAIL({ index, detail: surveyDetail })
      )
    })
  })
})
