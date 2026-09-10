<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button, Container } from "@/shared/ui";
import { usePageSeo } from "../lib/usePageSeo";

usePageSeo();

const { t } = useI18n();
</script>

<template>
  <Container>
    <section class="not-found-page">
      <p class="not-found-page__code">404</p>
      <h1 class="not-found-page__title">{{ t("notFound.title") }}</h1>
      <p class="not-found-page__text">{{ t("notFound.text") }}</p>
      <Button to="/" size="l">
        {{ t("notFound.btnHome") }}
      </Button>
    </section>
  </Container>
</template>

<style lang="scss" scoped>
/** @define not-found-page */
@use "shared/assets/styles/mixins" as *;

.not-found-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  align-items: center;
  padding-block: var(--spacing-5xl);
  text-align: center;

  &__code {
    @include text("heading-xl");

    margin: 0;
    color: var(--color-text-brand);
  }

  &__title {
    @include text("heading-l");

    margin: 0;
    color: var(--color-text-primary);
  }

  &__text {
    @include text("body-m");

    margin: 0;
    color: var(--color-text-secondary);
  }
}
</style>
