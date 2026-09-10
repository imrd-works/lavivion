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
  void fetchExampleOverride({ accepted: true });
}
</script>

<template>
  <div class="privacy-page">
    <h1 class="privacy-page__title">{{ t("privacy.title") }}</h1>
    <p class="privacy-page__text">{{ t("privacy.text") }}</p>
    <div class="privacy-page__actions">
      <button type="button" class="privacy-page__btn" @click="onBackendError">
        {{ t("privacy.btnBackendError") }}
      </button>
      <button type="button" class="privacy-page__btn" @click="onOverride">
        {{ t("privacy.btnOverride") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define privacy-page */
@use "assets/styles/mixins" as *;

.privacy-page {
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
