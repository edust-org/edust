import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import checkFile from "eslint-plugin-check-file"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["**/.next", "**/dist", "**/build"],
  },

  {
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "off",
      // check-file
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/**/*.{jsx,tsx}": "KEBAB_CASE",
          "src/**/*.{js,ts}": "KEBAB_CASE",
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/": "KEBAB_CASE",
        },
      ],
    },
  },
]
