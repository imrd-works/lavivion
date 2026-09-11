<script setup lang="ts">
import { Motion } from "@/shared/ui";
import { revealCascade } from "@/shared/config/motion";
import { imageSizes } from "@/shared/config/image";

defineProps<{
  title: string;
  description: string;
  image: string;
}>();

const sizes = imageSizes({ xs: 100 });
</script>

<template>
  <section class="showcase-hero">
    <NuxtImg
      class="showcase-hero__image"
      :src="image"
      width="2784"
      height="720"
      :sizes="sizes"
      preload
      fetchpriority="high"
      preset="photo"
      alt=""
    />
    <Motion v-bind="revealCascade" class="showcase-hero__content">
      <h1 class="showcase-hero__title">{{ title }}</h1>
      <p class="showcase-hero__description">{{ description }}</p>
    </Motion>
  </section>
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
    // Animated by CSS rather than by the reveal queue: the queue only starts
    // once the animation library has loaded, and the picture of the first
    // screen has to be painted before that to keep the largest paint early.
    // It takes twice the section duration because it fills the whole screen,
    // and the same motion over that area reads as abrupt at section speed.
    animation: showcase-hero-appear calc(var(--duration-reveal) * 2)
      var(--ease-decelerate) both;
  }

  // The text column is a fixed width from the mockup, not a fraction of the
  // grid, and it belongs to the block rather than to each line of copy.
  &__content {
    position: absolute;
    top: 50%;
    left: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    align-items: flex-start;
    max-width: 432px;
    transform: translateY(-50%);
  }

  &__title {
    @include text("heading-xl");

    margin: 0;
    color: var(--color-text-primary);
  }

  &__description {
    @include text("body-m");

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
      // The rings sit right of centre in the photo, so the shorter crop has
      // to be shifted that way or it keeps only the empty half of the frame.
      object-position: 72% 50%;
    }

    &__content {
      position: static;
      max-width: none;
      transform: none;
    }
  }

  @include bp-down("md") {
    &__image {
      aspect-ratio: 4 / 3;
    }
  }
}

@keyframes showcase-hero-appear {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}
</style>
