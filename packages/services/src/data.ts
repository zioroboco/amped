import { S3 } from "aws-sdk"

type DataRetriever = (path: string) => Promise<string>

const createS3DataRetriever = (
  bucket: string,
  region: string
): DataRetriever => {
  return async (key: string) => {
    return new S3({ region })
      .getObject({
        Bucket: bucket,
        Key: key
      })
      .promise()
      .then(data => data.Body as Buffer)
      .then(body => body.toString("utf8"))
  }
}

export { DataRetriever, createS3DataRetriever }
