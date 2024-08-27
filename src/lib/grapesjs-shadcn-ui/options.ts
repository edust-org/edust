import { EditorConfig } from "grapesjs";
import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginTuiImageEditor from "grapesjs-tui-image-editor";
import gsPluginExport from "grapesjs-plugin-export";
import gsPluginCustomCode from "grapesjs-custom-code";
import plugins from "./plugins";

const options = (editorRef: any): EditorConfig => ({
  height: "100vh",
  storageManager: {
    type: "remote", // Storage type. Available: local | remote
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 10, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
    options: {
      remote: {
        // Load project data
        urlLoad: `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v0/organizations/site`,
        onLoad: (result) => {
          const site_data = JSON.parse(result?.data?.site_data);
          return editorRef.current.loadProjectData(site_data);
        },

        // Store project data
        urlStore: `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v0/organizations/site`,
        fetchOptions: (opts) =>
          opts.method === "POST" ? { ...opts, method: "PATCH" } : opts,
        onStore: (data) => ({ site_data: JSON.stringify(data) }),
      },
    },
  },
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  assetManager: {
    uploadName: "file",
    // Disabled at this moment
    // uploadFile: (e) => useUploadFile(e, editorRef),
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
});
export default options;
