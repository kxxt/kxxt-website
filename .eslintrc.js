// .eslintrc

module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  settings: {
    react: {
      version: "detect", // detect react version
    },
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true, // defines things like process.env when generating through node
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/prop-types": 0,
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
}
