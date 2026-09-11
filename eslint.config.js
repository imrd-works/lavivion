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

// Feature-Sliced Design allows imports downwards only. The zones below spell
// that out layer by layer, so a wrong direction fails the lint instead of
// waiting for someone to spot it in review.
const LAYERS = ["app", "pages", "widgets", "features", "entities", "shared"];

const layerZones = LAYERS.flatMap((layer, index) => {
  const above = LAYERS.slice(0, index);
  if (above.length === 0) return [];

  return [
    {
      target: `./src/${layer}`,
      from: above.map((upper) => `./src/${upper}`),
      message: `${layer} is below those layers: a slice may only import from the layers under it.`,
    },
  ];
});

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
      "import/no-unresolved": [
        "error",
        { ignore: ["^virtual:", "\\.svg\\?component$"] },
      ],
      "import/no-restricted-paths": [
        "error",
        { basePath: import.meta.dirname, zones: layerZones },
      ],
      // Slices are reached through their public API. `shared` is the
      // exception: it has no slices, only segments addressed directly.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/pages/*/*",
                "@/widgets/*/*",
                "@/features/*/*",
                "@/entities/*/*",
              ],
              message:
                "Import a slice through its index.ts, not its internals.",
            },
          ],
        },
      ],
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
