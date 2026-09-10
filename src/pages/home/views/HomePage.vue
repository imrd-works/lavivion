<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePageSeo } from "../seo/usePageSeo";
import { fetchExampleBackendError, fetchExampleOverride } from "../api";

usePageSeo();
const { t } = useI18n();

function onBackendError() {
  void fetchExampleBackendError();
}

function onOverride() {
  void fetchExampleOverride({ name: "test" });
}
</script>

<template>
  <div class="home-page">
    <h1 class="home-page__title">{{ t("home.title") }}</h1>
    <p class="home-page__text">{{ t("home.text") }}</p>
    <div class="home-page__actions">
      <button type="button" class="home-page__btn" @click="onBackendError">
        {{ t("home.btnBackendError") }}
      </button>
      <button type="button" class="home-page__btn" @click="onOverride">
        {{ t("home.btnOverride") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define home-page */
@use "assets/styles/mixins" as *;

.home-page {
  &__title {
    margin-bottom: var(--spacing-m);
    @include text("heading-l");
  }

  &__text {
    margin-bottom: var(--spacing-m);
    color: var(--color-text-secondary);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-m);
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
