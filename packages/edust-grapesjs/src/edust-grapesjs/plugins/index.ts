import { blocksPlugins } from "./blocks"
import { componentsPlugin } from "./components"
import { customPlugin } from "./custom-plugin"
import { layoutPlugin } from "./layouts"
import { templatesPlugins } from "./templates"
import { typographyPlugin } from "./typography"

export default [
  typographyPlugin,
  componentsPlugin,
  layoutPlugin,
  templatesPlugins,
  customPlugin,
  ...blocksPlugins,
]
