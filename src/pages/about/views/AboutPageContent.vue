<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { fetchExampleBackendError, fetchExampleOverride } from "../api";

await new Promise((resolve) => setTimeout(resolve, 1500));

const { t } = useI18n();

function onBackendError() {
  void fetchExampleBackendError();
}

function onOverride() {
  void fetchExampleOverride({ title: "About" });
}
</script>

<template>
  <div class="about-page">
    <h1 class="about-page__title">{{ t("about.title") }}</h1>
    <p class="about-page__text">{{ t("about.text") }}</p>
    <div class="about-page__actions">
      <button type="button" class="about-page__btn" @click="onBackendError">
        {{ t("about.btnBackendError") }}
      </button>
      <button type="button" class="about-page__btn" @click="onOverride">
        {{ t("about.btnOverride") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define about-page */
@use "assets/styles/mixins" as *;

.about-page {
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
