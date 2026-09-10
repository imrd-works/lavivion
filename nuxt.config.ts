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
  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots"],
  // Pre-compress static assets (gzip + brotli) at build time.
  nitro: { compressPublicAssets: true },
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
