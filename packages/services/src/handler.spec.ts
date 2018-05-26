import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda"
import { response, createHandler, keyFromPath } from "./handler"
import { createS3DataRetriever, DataRetriever } from "./data"

const pathKeyPairs = [
  { path: "", key: "index.json" },
  { path: "/", key: "index.json" },
  { path: "/1", key: "1.json" },
  { path: "/2", key: "2.json" },
  { path: "/1.json", key: "1.json" },
  { path: "/2.json", key: "2.json" }
]

describe("keyFromPath function", () => {
  it("maps paths to correct keys", () => {
    pathKeyPairs.forEach(({ path, key }) => expect(keyFromPath(path)).toBe(key))
  })
})
