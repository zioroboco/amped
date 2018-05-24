// This is the base jest config file for workspaces. It is imported into their
// individual `jest.config.js` files, and can be extended there as required.

module.exports = {
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    "\\@amped/(.*)": "<rootDir>/../$1/src"
  },
  moduleFileExtensions: ["json", "js", "ts"]
}
