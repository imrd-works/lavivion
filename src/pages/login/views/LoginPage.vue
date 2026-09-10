<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { usePageSeo } from "../seo/usePageSeo";

usePageSeo();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

function login() {
  userStore.login(
    { id: "1", email: "user@example.com", name: "User" },
    "fake-token",
  );
  const redirect = (route.query.redirect as string) || "/dashboard";
  void router.push(redirect);
}
</script>

<template>
  <div class="login-page">
    <h1 class="login-page__title">{{ t("login.title") }}</h1>
    <p class="login-page__text">{{ t("login.text") }}</p>
    <button type="button" class="login-page__btn" @click="login">
      {{ t("login.btnLogin") }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
/** @define login-page */
@use "assets/styles/mixins" as *;

.login-page {
  max-width: 24rem;
  margin: 0 auto;

  &__title {
    margin-bottom: var(--spacing-m);
    @include text("heading-l");
  }

  &__text {
    margin-bottom: var(--spacing-m);
    color: var(--color-text-secondary);
  }

  &__btn {
    padding: var(--spacing-s) var(--spacing-m);
    color: var(--color-action-primary-fg);
    background: var(--color-action-primary-bg);
    border: none;
    border-radius: var(--radius-m);
    cursor: pointer;
    transition: background-color var(--duration-fast) var(--ease-standard);
    @include text("label-l");

    &:hover {
      background: var(--color-action-primary-bg-hover);
    }
  }
}
</style>
