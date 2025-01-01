import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest", // Enable the latest ECMAScript syntax
        sourceType: "module", // Use ES Modules
        project: "./tsconfig.json", // For TypeScript-specific rules
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // General JavaScript rules
      eqeqeq: "error", // Enforce === and !==
      "no-var": "error", // Disallow var, use let/const
      "prefer-const": "warn", // Suggest using const where possible
      "no-console": "warn", // Discourage console.log in production code
      curly: "error", // Enforce consistent brace style for blocks

      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ], // Ignore unused variables prefixed with _
      "@typescript-eslint/no-explicit-any": "warn", // Discourage use of `any`
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ], // Enforce function return type definitions
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // Enforce use of `interface` over `type`
      "@typescript-eslint/no-inferrable-types": "warn", // Avoid explicit types where they can be inferred

      // Import-related rules
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ], // Enforce import order
      "import/no-unresolved": "error", // Flag unresolved imports
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,ts}",
            "**/*.spec.{js,ts}",
            "**/vite.config.{js,ts}",
          ],
        },
      ], // Avoid unnecessary dependencies

      // Node.js-specific rules
      "no-process-env": "off", // Allow use of `process.env`
      "no-process-exit": "error", // Disallow `process.exit()`
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
