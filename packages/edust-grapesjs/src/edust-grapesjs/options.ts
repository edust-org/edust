import { EditorConfig } from "grapesjs"
import gsPluginBlocksBasic from "grapesjs-blocks-basic"
import gsPluginCustomCode from "grapesjs-custom-code"
import gsPluginExport from "grapesjs-plugin-export"
import gsPluginTuiImageEditor from "grapesjs-tui-image-editor"

import plugins from "./plugins"
import template from "./template"

function options(): EditorConfig {
  return {
    canvas: {
      scripts: ["https://cdn.tailwindcss.com?v=3.4.5"],
    },
    undoManager: { trackSelection: false },
    selectorManager: { componentFirst: true },
    storageManager: {
      type: "remote", // Storage type. Available: local | remote
      autosave: true, // Store data automatically
      autoload: true, // Autoload stored data on init
      stepsBeforeSave: 2, // If autosave is enabled, indicates how many changes are
    },
    pageManager: {
      pages: [
        {
          name: "home",
          component: template,
        },
      ],
    },
    panels: { defaults: [] }, // Avoid default panels
    // If you enable multiple pages options then you need this
    deviceManager: {
      devices: [
        {
          name: "Desktop",
          width: "",
          // widthMedia: "1024px",
        },
        {
          name: "Tablet",
          width: "768px",
          widthMedia: "768px",
        },
        // {
        //   name: "Mobile Landscape",
        //   width: "640px",
        //   widthMedia: "640px",
        // },
        {
          name: "Mobile Portrait",
          width: "375px",
          widthMedia: "375px",
        },
      ],
    },

    plugins: [
      gsPluginBlocksBasic,
      ...plugins,
      gsPluginTuiImageEditor,
      gsPluginExport,
      gsPluginCustomCode,
    ],
    pluginsOpts: {},
  }
}
export default options
