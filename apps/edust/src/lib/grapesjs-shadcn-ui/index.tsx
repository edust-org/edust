import { useRef } from "react";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor, { Canvas } from "@grapesjs/react";
import { RightPanel } from "./right-panel";
import { TopControllers } from "./top-controllers";
import options from "./options";
import { default as customOnEditor } from "./on-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui";
import { LeftPanel } from "./left-panel";
import useWindowSize from "./hooks/use-window-resize";

export const GrapesjsShadcnUI = (props) => {
  const { onEditor, optionsCustomize } = props;
  const { width: windowWidth } = useWindowSize();
  const editorRef = useRef<Editor | null>(null);

  const gsOnEditor = async (editor: Editor) => {
    if (!editor) {
      console.error("Editor is not initialized");
      return;
    }

    editorRef.current = editor;

    await onEditor(editor);

    return customOnEditor(editor);
  };

  return (
    <div>
      <GjsEditor
        className="gjs-custom-editor"
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css" // css cdn
        // GrapesJS init options
        options={{ ...options(editorRef), ...optionsCustomize(editorRef) }}
        onEditor={gsOnEditor}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="flex h-screen overflow-hidden"
        >
          {/* Start Left Panel */}
          <ResizablePanel
            defaultSize={
              windowWidth >= 1280
                ? 12
                : windowWidth >= 1024
                  ? 15
                  : windowWidth >= 768
                    ? 20
                    : 12
            }
            minSize={8}
            className="h-full w-[200px] bg-white"
          >
            <LeftPanel />
          </ResizablePanel>
          <ResizableHandle />
          {/* end Left Panel */}

          {/* Start Middle Area */}
          <ResizablePanel minSize={30} className="h-full flex-1">
            <header>
              <TopControllers />
            </header>
            <main className="h-full">
              <Canvas className="border-b-[42px] border-transparent bg-slate-200" />
            </main>
          </ResizablePanel>
          {/* End Middle Area */}

          {/* Start Right Panel */}
          <ResizableHandle />
          <ResizablePanel
            defaultSize={
              windowWidth >= 1280
                ? 13
                : windowWidth >= 1024
                  ? 15
                  : windowWidth >= 768
                    ? 20
                    : 13
            }
            minSize={8}
            className="h-full w-[200px] bg-white"
          >
            <RightPanel />
          </ResizablePanel>
          {/* End Right Panel */}
        </ResizablePanelGroup>
      </GjsEditor>
    </div>
  );
};
