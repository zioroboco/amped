import { Handler } from "aws-lambda"

type HandlerFactory = () => Handler

const makeHandler: HandlerFactory = () => (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "OK"
  }
  callback(null, response)
}

const handler = makeHandler()

export { handler, makeHandler }
