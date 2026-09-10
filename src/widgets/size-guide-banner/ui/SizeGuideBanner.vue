<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button, Motion } from "@/shared/ui";
import { revealCascade } from "@/shared/config/motion";
import { ContactRequestButton } from "@/features/request-contact";
import { sizeGuideLink } from "../config/navigation";

defineProps<{
  image: string;
}>();

const { t } = useI18n();
</script>

<template>
  <Motion v-bind="revealCascade" tag="section" class="size-guide-banner">
    <div class="size-guide-banner__media">
      <img class="size-guide-banner__image" :src="image" alt="" />
      <span class="size-guide-banner__fade" />
    </div>

    <div class="size-guide-banner__content">
      <div class="size-guide-banner__text">
        <h2 class="size-guide-banner__title">
          {{ t("sizeGuideBanner.title") }}
        </h2>
        <p class="size-guide-banner__description">
          {{ t("sizeGuideBanner.description") }}
        </p>
      </div>

      <div class="size-guide-banner__actions">
        <Button variant="outline" size="l" :to="sizeGuideLink">
          {{ t("sizeGuideBanner.openSizer") }}
        </Button>
        <ContactRequestButton size="l">
          {{ t("sizeGuideBanner.contactExpert") }}
        </ContactRequestButton>
      </div>
    </div>
  </Motion>
</template>

<style lang="scss" scoped>
/** @define size-guide-banner */
@use "shared/assets/styles/mixins" as *;

.size-guide-banner {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-2xl);
  align-items: center;
  overflow: hidden;
  background: var(--color-bg-surface-subtle);

  &__media {
    position: relative;
    align-self: stretch;
    min-width: 0;
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fade {
    position: absolute;
    inset: 0 0 0 50%;
    background: linear-gradient(
      90deg,
      var(--color-overlay-subtle),
      var(--color-bg-surface-subtle)
    );
  }

  &__content {
    display: flex;
    gap: var(--spacing-2xl);
    align-items: center;
    min-width: 0;
    padding-right: var(--spacing-2xl);
    padding-block: var(--spacing-3xl);
  }

  &__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-l);
    min-width: 0;
  }

  &__title {
    @include text("heading-m");

    margin: 0;
    color: var(--color-text-primary);
  }

  &__description {
    @include text("body-m");

    margin: 0;
    color: var(--color-text-secondary);
  }

  &__actions {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-s);
    min-width: 0;
  }

  @include bp-down("lg") {
    &__content {
      flex-direction: column;
      align-items: stretch;
      padding: var(--spacing-2xl);
    }
  }

  @include bp-down("md") {
    grid-template-columns: 1fr;

    &__media {
      aspect-ratio: 16 / 9;
    }

    // The fade blends the photo into the panel beside it; stacked there is
    // nothing to blend into.
    &__fade {
      display: none;
    }
  }
}
</style>
