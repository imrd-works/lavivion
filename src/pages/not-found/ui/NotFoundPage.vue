<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { usePageSeo } from "../lib/usePageSeo";

usePageSeo();
const router = useRouter();
const { t } = useI18n();

function goHome() {
  router.push("/");
}
</script>

<template>
  <div class="not-found-page">
    <h1 class="not-found-page__code">404</h1>
    <p class="not-found-page__text">{{ t("notFound.text") }}</p>
    <button type="button" class="not-found-page__btn" @click="goHome">
      {{ t("notFound.btnHome") }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
/** @define not-found-page */
@use "shared/assets/styles/mixins" as *;

.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-m);

  &__code {
    margin-bottom: var(--spacing-s);
    color: var(--color-action-primary-bg);
    @include text("display-s");
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
