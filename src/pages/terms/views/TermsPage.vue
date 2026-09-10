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
  <div class="terms-page">
    <h1 class="terms-page__title">{{ t("terms.title") }}</h1>
    <p class="terms-page__text">{{ t("terms.text") }}</p>
    <div class="terms-page__actions">
      <button type="button" class="terms-page__btn" @click="onBackendError">
        {{ t("terms.btnBackendError") }}
      </button>
      <button type="button" class="terms-page__btn" @click="onOverride">
        {{ t("terms.btnOverride") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define terms-page */
@use "assets/styles/mixins" as *;

.terms-page {
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
