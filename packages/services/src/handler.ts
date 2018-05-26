import { Handler, APIGatewayEvent } from "aws-lambda"
import { DataRetriever, createS3DataRetriever } from "./data"

const minifyJson = (json: string) => JSON.stringify(JSON.parse(json))

/** Return the key of the target JSON file for a given path. */
const keyFromPath = (path: string) => {
  const match = path.match(/^\/(\d+)/)
  return `${match && match[1] ? match[1] : "index"}.json`
}

/** Construct an HTTP response object. */
const response = (status: number, data?: string) => ({
  statusCode: status,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  },
  body: minifyJson(data || "")
})

type HandlerFactory = (getData: DataRetriever) => Handler

/** Return a handler function constructed with the passed data retriever. */
const createHandler: HandlerFactory = getData => (
  event: APIGatewayEvent,
  context,
  callback
) => {
  const key = keyFromPath(event.path)
  getData(key)
    .then(data => callback(null, response(200, data)))
    .catch(error => callback(null, response(404)))
}

// Variables passed from Lambda execution context
const AMPED_DATA_BUCKET = process.env.AMPED_DATA_BUCKET!
const SLS_REGION = process.env.SLS_REGION!

const s3dataRetriever = createS3DataRetriever(AMPED_DATA_BUCKET, SLS_REGION)
const handler = createHandler(s3dataRetriever)

export { minifyJson, keyFromPath, response, handler, createHandler }
