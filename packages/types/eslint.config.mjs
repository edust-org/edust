import { config as baseConfig } from "@edust/eslint-config/base"
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
  ...baseConfig,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: eslintPluginImport,
    },
  },
]

export default eslintConfig
