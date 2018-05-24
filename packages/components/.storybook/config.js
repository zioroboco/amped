import { configure } from "@storybook/react"

const importAll = stories =>
  stories.keys().forEach(filename => stories(filename))

const loadStories = () =>
  importAll(require.context("../stories", true, /\.stories\.tsx$/))

configure(loadStories, module)
