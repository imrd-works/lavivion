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
  void fetchExampleOverride({ email: "test@test.com", message: "Hello" });
}
</script>

<template>
  <div class="contacts-page">
    <h1 class="contacts-page__title">{{ t("contacts.title") }}</h1>
    <p class="contacts-page__text">{{ t("contacts.text") }}</p>
    <div class="contacts-page__actions">
      <button type="button" class="contacts-page__btn" @click="onBackendError">
        {{ t("contacts.btnBackendError") }}
      </button>
      <button type="button" class="contacts-page__btn" @click="onOverride">
        {{ t("contacts.btnOverride") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define contacts-page */
@use "assets/styles/mixins" as *;

.contacts-page {
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
