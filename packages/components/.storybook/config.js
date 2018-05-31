import { configure } from "@storybook/react"
import { setOptions } from "@storybook/addon-options"

setOptions({ name: "amped", showAddonPanel: false })

const importAll = stories =>
  stories.keys().forEach(filename => stories(filename))

const loadStories = () =>
  importAll(require.context("../stories", true, /\.stories\.tsx$/))

configure(loadStories, module)
