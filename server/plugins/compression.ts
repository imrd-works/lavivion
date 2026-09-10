import { useCompression } from "h3-compression";
import { defineNitroPlugin } from "nitropack/runtime";

/**
 * Nitro pre-compresses files in public/ at build time but sends the rendered
 * page as plain text. Behind a CDN that is fine, but the page has to stay
 * light when the node server is exposed directly.
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("render:response", async (response, { event }) => {
    const type = response.headers?.["content-type"];
    if (!type?.startsWith("text/html")) return;

    await useCompression(event, response);
  });
});
