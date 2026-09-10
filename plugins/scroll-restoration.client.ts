import { defineNuxtPlugin } from "#app";

/**
 * Nuxt's router plugin turns browser scroll restoration back on, which lands a
 * reload in the middle of the page. There the reveal sequence would start from
 * whatever section happens to be on screen, so a reload begins at the top.
 */
export default defineNuxtPlugin(() => {
  if (!("scrollRestoration" in window.history)) return;

  window.history.scrollRestoration = "manual";

  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});
