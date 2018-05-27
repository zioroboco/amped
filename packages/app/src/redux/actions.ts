import { SurveyResultList, SurveyResultDetail } from "@amped/types"
import { State } from "./store"
import { Action, ActionCreator, Dispatch } from "redux"
import { actionCreatorFactory } from "typescript-fsa"

// API endpoint substituted in at build-time by webpack
const { AMPED_API_ENDPOINT } = process.env

// Type-safe flux-standard-action creators
const actionCreator = actionCreatorFactory()
const RECEIVE_SUMMARY = actionCreator<SurveyResultList>("RECEIVE_SUMMARY")
const REQUEST_DETAIL = actionCreator<number>("REQUEST_DETAIL")
const RECEIVE_DETAIL = actionCreator<{
  index: number
  detail: SurveyResultDetail
}>("RECEIVE_DETAIL")

/** Async action to fetch the summary data and then dispatch. */
const asyncFetchSummary = () => {
  return dispatch =>
    fetch(AMPED_API_ENDPOINT)
      .then(response => response.json(), error => console.error(error))
      .then(json => {
        dispatch(RECEIVE_SUMMARY(json as SurveyResultList))
      })
}

/** Async action to fetch detail data for a given index and then dispatch. */
const asyncFetchDetail = (index: number) => {
  return dispatch => {
    dispatch(REQUEST_DETAIL(index))
    return fetch(`${AMPED_API_ENDPOINT}/${index}`)
      .then(response => response.json(), error => console.error(error))
      .then(json =>
        dispatch(RECEIVE_DETAIL({ index, detail: json as SurveyResultDetail }))
      )
  }
}

export {
  RECEIVE_SUMMARY,
  REQUEST_DETAIL,
  RECEIVE_DETAIL,
  asyncFetchSummary,
  asyncFetchDetail
}
