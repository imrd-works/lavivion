<script setup lang="ts">
import { Motion } from "@/shared/ui";
import { revealCascade } from "@/shared/config/motion";

defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>

<template>
  <Motion v-bind="revealCascade" tag="section" class="showcase-hero">
    <img class="showcase-hero__image" :src="image" alt="" />
    <div class="showcase-hero__content">
      <h1 class="showcase-hero__title">{{ title }}</h1>
      <p class="showcase-hero__description">{{ description }}</p>
    </div>
  </Motion>
</template>

<style lang="scss" scoped>
/** @define showcase-hero */
@use "shared/assets/styles/mixins" as *;

.showcase-hero {
  position: relative;
  aspect-ratio: 1392 / 360;
  overflow: hidden;

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    align-items: flex-start;
    padding: var(--spacing-2xl);
    transform: translateY(-50%);
  }

  &__title {
    @include text("heading-xl");

    max-width: 432px;
    margin: 0;
    color: var(--color-text-primary);
  }

  &__description {
    @include text("body-m");

    max-width: 432px;
    margin: 0;
    color: var(--color-text-secondary);
  }

  // Below the desktop width the text moves out from over the photo: the
  // banner gets too short to hold the copy, and a light image cannot carry it.
  @include bp-down("lg") {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    aspect-ratio: auto;

    &__image {
      position: static;
      height: auto;
      aspect-ratio: 16 / 9;
    }

    &__content {
      position: static;
      padding: 0;
      transform: none;
    }

    &__title,
    &__description {
      max-width: none;
    }
  }

  @include bp-down("md") {
    &__image {
      aspect-ratio: 4 / 3;
    }
  }
}
</style>
