export type SurveyResultList = {
  survey_results: SurveyResult[]
}

export type SurveyResult = {
  name: SurveyName
  url: SurveyURL
  participant_count: number
  response_rate: number
}

export type SurveyName = string

export type SurveyURL = string

export type SurveyResultDetail = {
  survey_result_detail: {
    submitted_response_count: number
    themes: SurveyTheme[]
  } & SurveyResult
}

export type SurveyTheme = {
  name: SurveyThemeName
  questions: SurveyQuestion[]
}

export type SurveyThemeName = string

export type SurveyQuestion = {
  description: SurveyQuestionDescription
  question_type: "ratingquestion"
  survey_responses: SurveyQuestionResponse[]
}

export type SurveyQuestionDescription = string

export type SurveyQuestionResponse = {
  id: number
  question_id: number
  respondent_id: SurveyRespondant
  response_content: "5" | "4"
}

export type SurveyRespondant = number

export type ResponseContent = "5" | "4" | "3" | "2" | "1" | "0" | ""
