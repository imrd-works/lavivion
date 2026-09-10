import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath, URL } from "node:url";

const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://example.com";
const srcPath = fileURLToPath(new URL("./src", import.meta.url));
const aliases = {
  "@/api": fileURLToPath(new URL("./src/app/api", import.meta.url)),
  "@/i18n": fileURLToPath(new URL("./src/app/i18n", import.meta.url)),
  "@/stores": fileURLToPath(new URL("./src/shared/stores", import.meta.url)),
  "@/composables": fileURLToPath(
    new URL("./src/shared/composables", import.meta.url),
  ),
  "@/locales": fileURLToPath(new URL("./src/shared/locales", import.meta.url)),
  "@/shared/styles": fileURLToPath(
    new URL("./src/assets/styles", import.meta.url),
  ),
};

export default defineNuxtConfig({
  compatibilityDate: "2026-05-18",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots"],
  // Pre-compress static assets (gzip + brotli) at build time.
  nitro: { compressPublicAssets: true },
  alias: aliases,
  css: ["@/assets/styles/main.scss"],
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
          loadPaths: [fileURLToPath(new URL("./src", import.meta.url))],
        },
      },
    },
    resolve: {
      alias: [
        ...Object.entries(aliases).map(([find, replacement]) => ({
          find,
          replacement,
        })),
        { find: "@", replacement: srcPath },
      ],
    },
  },
});
