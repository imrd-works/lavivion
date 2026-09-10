export default defineNuxtRouteMiddleware(() => {
  if (import.meta.dev) return;

  return abortNavigation(
    createError({
      statusCode: 404,
      statusMessage: "Page not found",
    }),
  );
});
