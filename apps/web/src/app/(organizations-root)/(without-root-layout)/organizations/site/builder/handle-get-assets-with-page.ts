export const handleGetAssetsWithPage = (editor) => {
  const selectedComponent = editor?.Pages?.getSelected()
  const page = {
    pageName: selectedComponent?.getName(),
    html: editor.getHtml({
      component: selectedComponent?.getMainComponent(),
    }),
    css: editor.getCss({
      component: selectedComponent?.getMainComponent(),
    }),
  }
  // in this here assets means whole project data
  const assets = editor.getProjectData()

  return { page, assets }
}
