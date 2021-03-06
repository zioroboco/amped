// This is the main jest config file for the workspace root.

module.exports = {
  projects: ["<rootDir>/packages/*"],
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage"
}
