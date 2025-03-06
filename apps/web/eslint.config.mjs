import { nextJsConfig } from "@edust/eslint-config/next-js"
import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginImport from "eslint-plugin-import"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...nextJsConfig,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "check-file/folder-naming-convention": [
        "error",
        {
          "**/app/**/": "NEXT_JS_APP_ROUTER_CASE",
        },
      ],
    },
  },
]

export default eslintConfig
