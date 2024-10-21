module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],

  ignorePatterns: ["dist", ".eslintrc.cjs", "src/types"],

  parser: "@typescript-eslint/parser",

  plugins: ["react-refresh", "check-file"],

  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // check-file
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{jsx,tsx}": "KEBAB_CASE",
        "**/*.{js,ts}": "KEBAB_CASE",
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "KEBAB_CASE",
      },
    ],
  },

  overrides: [
    {
      files: [
        "vite-env.d.ts",
        "vite.config.ts",
        ".eslintrc.js",
        "tailwind.config.js",
      ],
      rules: {
        "check-file/filename-naming-convention": "off",
      },
    },
  ],
};
