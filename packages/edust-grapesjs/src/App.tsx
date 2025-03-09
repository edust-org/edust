import EdustGrapesjs from "./edust-grapesjs"
import { ContextProviders } from "./edust-grapesjs/context"

function App() {
  return (
    <>
      <ContextProviders
        pageOptions={{
          addANewPage: async () => true,
          deletePage: async () => true,
          editPageName: async () => true,
        }}
      >
        <EdustGrapesjs optionsCustomize={async () => {}} configs={{}} />
      </ContextProviders>
    </>
  )
}

export default App
