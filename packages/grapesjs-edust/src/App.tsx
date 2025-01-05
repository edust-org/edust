import { ContextProviders } from "./context"
import { GrapesjsEdust } from "./grapesjs-edust"
function App() {
  // const token = ""

  // const onEditor = async (editor: any) => {
  //   editor.Commands.add("save-db", {
  //     run: async () => {
  //       const selectedComponent = editor?.Pages?.getSelected()
  //       const page = {
  //         page_name: selectedComponent?.getName(),
  //         html: editor.getHtml({
  //           component: selectedComponent?.getMainComponent(),
  //         }),
  //         css: editor.getCss({
  //           component: selectedComponent?.getMainComponent(),
  //         }),
  //       }

  //       // in this here assets means whole project data
  //       const assets = editor.getProjectData()
  //       /*
  //       saveGsData({
  //         assets,
  //         page,
  //       })
  //         .unwrap()
  //         .then((res) => {
  //           if (res?.status) {
  //             toast({
  //               variant: "success",
  //               title: res?.message,
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           toast({
  //             variant: "destructive",
  //             title: error?.data?.message,
  //           });
  //         });*/
  //     },
  //   })
  // }

  // const optionsCustomize = (editorRef) => ({
  //   storageManager: {
  //     type: "remote", // Storage type. Available: local | remote
  //     autosave: true, // Store data automatically
  //     autoload: true, // Autoload stored data on init
  //     stepsBeforeSave: 10, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
  //     options: {
  //       remote: {
  //         // Load project data
  //         urlLoad: `${
  //           import.meta.env.VITE_BACKEND_URL
  //         }/api/v0/organizations/site-builder/me`,

  //         onLoad: (result) => {
  //           return editorRef.current.loadProjectData(result?.data?.assets)
  //         },
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },

  //         // Store project data
  //         urlStore: `${
  //           import.meta.env.VITE_BACKEND_URL
  //         }/api/v0/organizations/site-builder`,

  //         fetchOptions: (opts) =>
  //           opts.method === "POST" ? { ...opts, method: "PATCH" } : opts,

  //         onStore: (assets, editor) => {
  //           const selectedComponent = editor?.Pages?.getSelected()
  //           const page = {
  //             page_name: selectedComponent?.getName(),
  //             html: editor.getHtml({
  //               component: selectedComponent?.getMainComponent(),
  //             }),
  //             css: editor.getCss({
  //               component: selectedComponent?.getMainComponent(),
  //             }),
  //           }
  //           return {
  //             assets,
  //             page,
  //           }
  //         },
  //       },
  //     },
  //   },

  //   assetManager: {
  //     autoAdd: true,
  //     uploadFile: (e) => {
  //       const files = e.dataTransfer ? e.dataTransfer.files : e.target?.files
  //       const formData = new FormData()
  //       formData.append("image", files[0])

  //       fetch("http://localhost:3000/api/v0/organizations/site/upload", {
  //         method: "POST",
  //         body: formData,
  //         credentials: "include",
  //       })
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok")
  //           }
  //           return response.json()
  //         })
  //         .then((data) => {
  //           const image_path = data?.data.src
  //           if (image_path) {
  //             const editor = editorRef?.current
  //             if (editor) {
  //               const assetManager = editor?.AssetManager
  //               assetManager.add([image_path])
  //               assetManager.render()
  //             }
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error)
  //         })
  //     },
  //   },
  // })

  return (
    <ContextProviders pageOptions={{ addANewPage: () => true }}>
      <GrapesjsEdust onEditor={async () => {}} optionsCustomize={() => ({})} />
    </ContextProviders>
  )
}

export default App
