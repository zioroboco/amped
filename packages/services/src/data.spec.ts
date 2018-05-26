import { createS3DataRetriever } from "./data"
import { SurveyResultList, SurveyResultDetail } from "@amped/types"

describe("S3 integration tests", () => {
  const bucket = "amped-data.ziorobo.co"
  const region = "ap-southeast-2"
  const retrieveData = createS3DataRetriever(bucket, region)

  it("returns survey result list", async () => {
    const data = await retrieveData("index.json")
    const result = JSON.parse(data) as SurveyResultList
    expect(result.survey_results).toBeTruthy()
  })

  it("returns survey result detail", async () => {
    const data = await retrieveData("1.json")
    const result = JSON.parse(data) as SurveyResultDetail
    expect(result.survey_result_detail).toBeTruthy()
  })
})
