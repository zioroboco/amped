// This is the base jest config file for workspaces. It is imported into their
// individual `jest.config.js` files, and can be extended there as required.

module.exports = {
  testMatch: ["<rootDir>/src/**/*.spec.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    // warning: these require equivalent mappers in the wallaby.js config
    "\\.css$": "identity-obj-proxy",
    "\\@amped/(.*)": "<rootDir>/../$1/src"
  },
  moduleFileExtensions: ["json", "js", "ts", "jsx", "tsx"]
}
