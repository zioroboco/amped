export type SurveyResultList = {
  survey_results: SurveyResult[]
}

export type SurveyResult = {
  name: string
  url: string
  participant_count: number
  response_rate: number
}

export type SurveyURL = string

export type SurveyResultDetail = {
  survey_result_detail: {
    submitted_response_count: number
    themes: SurveyTheme[]
  } & SurveyResult
}

export type SurveyTheme = {
  name: string
  questions: SurveyQuestion[]
}

export type SurveyQuestion = {
  description: string
  question_type: "ratingquestion"
  survey_responses: SurveyQuestionResponse[]
}

export type SurveyQuestionResponse = {
  id: number
  question_id: number
  respondent_id: number
  response_content: ResponseContent
}

export type ResponseContent = "5" | "4" | "3" | "2" | "1" | "0" | ""
