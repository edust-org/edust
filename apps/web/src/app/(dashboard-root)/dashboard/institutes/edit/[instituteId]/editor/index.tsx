import { useThemeStore } from "@/store"
import RichTextEditor from "reactjs-tiptap-editor"
import { BaseKit } from "reactjs-tiptap-editor"
import { Attachment } from "reactjs-tiptap-editor/attachment"
import { Blockquote } from "reactjs-tiptap-editor/blockquote"
import { Bold } from "reactjs-tiptap-editor/bold"
import { BulletList } from "reactjs-tiptap-editor/bulletlist"
import { Clear } from "reactjs-tiptap-editor/clear"
import { Code } from "reactjs-tiptap-editor/code"
import { CodeBlock } from "reactjs-tiptap-editor/codeblock"
import { Color } from "reactjs-tiptap-editor/color"
import { Emoji } from "reactjs-tiptap-editor/emoji"
import { ExportPdf } from "reactjs-tiptap-editor/exportpdf"
import { ExportWord } from "reactjs-tiptap-editor/exportword"
import { FontFamily } from "reactjs-tiptap-editor/fontfamily"
import { FontSize } from "reactjs-tiptap-editor/fontsize"
import { FormatPainter } from "reactjs-tiptap-editor/formatpainter"
import { Heading } from "reactjs-tiptap-editor/heading"
import { Highlight } from "reactjs-tiptap-editor/highlight"
import { History } from "reactjs-tiptap-editor/history"
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule"
import { Iframe } from "reactjs-tiptap-editor/iframe"
import { ImportWord } from "reactjs-tiptap-editor/importword"
import { Indent } from "reactjs-tiptap-editor/indent"
import { Italic } from "reactjs-tiptap-editor/italic"
import { Katex } from "reactjs-tiptap-editor/katex"
import { LineHeight } from "reactjs-tiptap-editor/lineheight"
import { Link } from "reactjs-tiptap-editor/link"
import { Mention } from "reactjs-tiptap-editor/mention"
import { Mermaid } from "reactjs-tiptap-editor/mermaid"
import { MoreMark } from "reactjs-tiptap-editor/moremark"
import { ColumnActionButton } from "reactjs-tiptap-editor/multicolumn"
import { OrderedList } from "reactjs-tiptap-editor/orderedlist"
import { SearchAndReplace } from "reactjs-tiptap-editor/searchandreplace"
import { SlashCommand } from "reactjs-tiptap-editor/slashcommand"
import { Strike } from "reactjs-tiptap-editor/strike"
import { Table } from "reactjs-tiptap-editor/table"
import { TableOfContents } from "reactjs-tiptap-editor/tableofcontent"
import { TaskList } from "reactjs-tiptap-editor/tasklist"
import { TextAlign } from "reactjs-tiptap-editor/textalign"
import { TextDirection } from "reactjs-tiptap-editor/textdirection"
import { TextUnderline } from "reactjs-tiptap-editor/textunderline"
import { Twitter } from "reactjs-tiptap-editor/twitter"

import React, { useCallback, useState } from "react"

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(",")
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TextDirection,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  // Image.configure({
  //   upload: (files: File) => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(URL.createObjectURL(files))
  //       }, 500)
  //     })
  //   },
  // }),
  // Video.configure({
  //   upload: (files: File) => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(URL.createObjectURL(files))
  //       }, 500)
  //     })
  //   },
  // }),
  // ImageGif.configure({
  //   GIPHY_API_KEY: import.meta.env.NEXT_PUBLIC_GIPHY_API_KEY,
  // }),
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: "dracula" }),
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: (files: File[]) => {
      const f = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))
      return Promise.resolve(f)
    },
  }),
  ExportWord,
  // Excalidraw,
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
  Mermaid.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
  Twitter,
]

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function Editor({
  setContentHtml,
  DEFAULT = "",
}: {
  setContentHtml: any
  DEFAULT: string
}) {
  const [content, setContent] = useState(DEFAULT)
  const refEditor = React.useRef<any>(null)

  const theme = useThemeStore((state) => state.theme)
  const [disable, setDisable] = useState(false)

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
      setContentHtml(value)
    }, 300),
    [],
  )

  return (
    <>
      <div className="mt-6">
        {/* <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: 10,
          }}
          className="buttonWrap"
        >
          <button onClick={() => locale.setLang("vi")}>Vietnamese</button>
          <button onClick={() => locale.setLang("en")}>English</button>
          <button onClick={() => locale.setLang("zh_CN")}>Chinese</button>
          <button type="button" onClick={() => locale.setLang("pt_BR")}>
            Português
          </button>
          <button type="button" onClick={() => locale.setLang("hu_HU")}>
            Hungarian
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button onClick={() => setDisable(!disable)}>
            {disable ? "Editable" : "Readonly"}
          </button>
          <button
            onClick={() => {
              window.open(
                "https://github.com/hunghg255/reactjs-tiptap-editor-demo",
                "_blank",
              )
            }}
          >
            Source Demo
          </button>
          <button
            onClick={() => {
              window.open("https://reactjs-tiptap-editor.vercel.app/", "_blank")
            }}
          >
            Documentation
          </button>
        </div> */}
        <RichTextEditor
          ref={refEditor}
          output="html"
          content={DEFAULT}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme == "dark"}
          disabled={disable}
        />

        {/* {typeof content === "string" && (
          <textarea
            className="textarea"
            readOnly
            style={{
              marginTop: 20,
              height: 500,
              width: "100%",
              borderRadius: 4,
              padding: 10,
            }}
            value={content}
          />
        )} */}
      </div>
    </>
  )
}

export default Editor
