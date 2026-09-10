import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";
import noCyrillicPlugin from "eslint-plugin-no-cyrillic-string";
import tsPlugin from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";

const noCyrillicEnabled = process.env.ESLINT_NO_CYRILLIC !== "0";

export default [
  { ignores: [".nuxt", ".output", "dist", "node_modules", "*.config.js"] },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/strongly-recommended"],
  ...pluginVueA11y.configs["flat/recommended"],
  ...tsPlugin.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsPlugin.parser,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
  },
  {
    files: ["src/shared/ui/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        defineNuxtRouteMiddleware: "readonly",
        definePageMeta: "readonly",
        navigateTo: "readonly",
      },
    },
    rules: {
      "vue/attribute-hyphenation": "error",
      "vue/component-definition-name-casing": "error",
      "vue/html-end-tags": "error",
      "vue/require-default-prop": "error",
      "vue/require-explicit-emits": "error",
      "vue/require-prop-types": "error",
    },
  },
  {
    files: ["pages/**/*.vue", "layouts/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    plugins: { import: pluginImport },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: true,
      },
      "import/ignore": ["virtual:.*", "\\.(scss|css)$"],
    },
    rules: {
      "import/no-unresolved": ["error", { ignore: ["^virtual:"] }],
    },
  },
  ...(noCyrillicEnabled
    ? [
        {
          files: [
            "src/**/*.ts",
            "src/**/*.vue",
            "pages/**/*.vue",
            "layouts/**/*.vue",
            "plugins/**/*.ts",
            "middleware/**/*.ts",
          ],
          ignores: ["**/locales/**", "**/*.json"],
          plugins: { "no-cyrillic-string": noCyrillicPlugin },
          rules: {
            "no-cyrillic-string/no-cyrillic-string": "error",
          },
        },
      ]
    : []),
];
