import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
import type { User } from "./types";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  // Token lives in a cookie so auth survives reloads and is available during
  // SSR (route middleware runs on the server). Not httpOnly — JS reads it to
  // attach the Authorization header; pair with a short maxAge + HTTPS in prod.
  const token = useCookie<string | null>("token", {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: !import.meta.dev,
    path: "/",
  });

  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);

  function setUser(data: User | null) {
    user.value = data;
  }

  function setToken(value: string | null) {
    token.value = value;
  }

  function login(userData: User, authToken: string) {
    user.value = userData;
    token.value = authToken;
  }

  function logout() {
    user.value = null;
    token.value = null;
  }

  return {
    user,
    token,
    isAuthenticated,
    currentUser,
    setUser,
    setToken,
    login,
    logout,
  };
});
