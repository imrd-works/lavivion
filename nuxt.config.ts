import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath, URL } from "node:url";

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
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
    pageTransition: { name: "fade", mode: "out-in" },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [srcPath],
        },
      },
    },
  },
});
