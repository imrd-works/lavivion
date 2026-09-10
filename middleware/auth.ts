import { useUserStore } from "@/stores";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});
