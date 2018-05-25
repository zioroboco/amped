import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda"
import { makeHandler } from "./handler"

beforeEach(() => jest.resetAllMocks())

describe("handler function", () => {
  const handler = makeHandler()
  const event = {} as APIGatewayEvent
  const context = {} as Context
  const callback = jest.fn<Callback>()

  it("runs without error", () => {
    handler(event, context, callback)
  })
})
