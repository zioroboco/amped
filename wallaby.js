module.exports = wallaby => ({
  debug: true,
  workers: {
    initial: 2,
    regular: 1
  },
  delays: {
    run: 1000
  },
  reportConsoleErrorAsError: true,
  env: {
    params: {
      env: "NODE_ENV=test"
    },
    type: "node"
  },
  testFramework: "jest",
  files: ["packages/*/src/**", "!packages/**/*.spec.{ts,tsx}"],
  tests: ["packages/**/*.spec.{ts,tsx}", "!packages/**/node_modules/**"],
  compilers: {
    "**/*.{ts,tsx}": wallaby.compilers.typeScript({
      typescript: require("typescript"),
      module: "commonjs",
      jsx: "react"
    })
  },
  setup: w => {
    w.testFramework.configure({
      moduleNameMapper: {
        "\\.css$": require.resolve("identity-obj-proxy"),
        "^@amped/(.+)": w.projectCacheDir + "/packages/$1/src"
      }
    })
  }
})
