import { typographyPlugin } from "./typography";
import { componentsPlugin } from "./components";
import { layoutPlugin } from "./layouts";
import { blocksPlugins } from "./blocks";
import { templatesPlugins } from "./templates";
import { customPlugin } from "./custom-plugin";

export default [
  typographyPlugin,
  componentsPlugin,
  layoutPlugin,
  templatesPlugins,
  customPlugin,
  ...blocksPlugins,
];
