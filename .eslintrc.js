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
    // Gatsby's required rules
    "no-anonymous-exports-page-templates": "warn",
    "limited-exports-page-templates": "warn",
    "react/prop-types": 0,
  },
}
