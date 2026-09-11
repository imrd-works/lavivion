import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";

const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://example.com";
const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2026-05-18",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots", "@nuxt/image"],
  image: {
    // Mirrors the SCSS breakpoints so a `sizes` prefix means the same width
    // in a template as it does in a stylesheet.
    screens: { xs: 320, sm: 480, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
    // Every picture on the page goes through this preset, so format and
    // quality are decided once instead of on each tag.
    presets: { photo: { modifiers: { format: "webp", quality: 80 } } },
  },
  nitro: {
    // Pre-compress static assets (gzip + brotli) at build time.
    compressPublicAssets: true,
    prerender: {
      // Links in the header and the footer point at pages that do not exist
      // yet, so the crawler is expected to meet the 404 page and must not
      // treat it as a reason to stop the static build.
      failOnError: false,
    },
  },
  alias: { "@": srcPath },
  css: ["@/app/styles/main.scss"],
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        process.env.VITE_API_BASE_URL ||
        "/api",
      siteUrl,
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      script: [
        {
          // Runs before the first paint so reveal targets can be hidden by CSS
          // without hiding anything from visitors without JavaScript.
          innerHTML: 'document.documentElement.classList.add("js")',
          tagPosition: "head",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/suisse-intl/SuisseIntl-Book.woff2",
          crossorigin: "",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/suisse-intl/SuisseIntl-Medium.woff2",
          crossorigin: "",
        },
      ],
    },
    pageTransition: { name: "fade", mode: "out-in" },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: { overrides: { removeViewBox: false } },
            },
          ],
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [srcPath],
        },
      },
    },
  },
});
