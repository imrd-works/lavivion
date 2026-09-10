import { defineNuxtPlugin } from "#app";
import { provideAuthSession } from "@/shared/api";
import { useUserStore } from "@/entities/user";

export default defineNuxtPlugin(() => {
  provideAuthSession({
    getToken: () => useUserStore().token,
    onUnauthorized: () => useUserStore().logout(),
  });
});
