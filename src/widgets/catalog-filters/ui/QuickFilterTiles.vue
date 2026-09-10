<script setup lang="ts">
import { Motion } from "@/shared/ui";
import { revealCascade } from "@/shared/config/motion";
import type { QuickFilter } from "../model/types";

defineProps<{
  items: QuickFilter[];
}>();
</script>

<template>
  <div class="quick-filter-tiles">
    <Motion v-bind="revealCascade" tag="ul" class="quick-filter-tiles__track">
      <li v-for="item in items" :key="item.id" class="quick-filter-tiles__item">
        <NuxtLink :to="item.to" class="quick-filter-tiles__link">
          <span class="quick-filter-tiles__media">
            <span class="quick-filter-tiles__overlay" />
            <img class="quick-filter-tiles__image" :src="item.image" alt="" />
          </span>
          <span class="quick-filter-tiles__label">{{ item.title }}</span>
        </NuxtLink>
      </li>
    </Motion>
  </div>
</template>

<style lang="scss" scoped>
/** @define quick-filter-tiles */
@use "shared/assets/styles/mixins" as *;

.quick-filter-tiles {
  @include scrollbar-hidden;

  // A scrollport clips the focus ring of the tile inside it. The padding gives
  // the ring room and the negative margin gives the space back to the layout;
  // snapping ignores that padding, so it is repeated as scroll padding.
  padding: 4px;
  margin: -4px;
  overflow-x: auto;
  scroll-padding: 4px;
  // The horizontal scrollbar area leaks a little vertical scroll, which would
  // swallow wheel gestures meant for the page.
  overflow-y: hidden;

  @include bp-down("lg") {
    scroll-snap-type: x mandatory;
  }

  &__track {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--spacing-2xl);
    align-items: start;
    padding: 0;
    margin: 0;
    list-style: none;

    @include bp-down("xl") {
      grid-template-columns: repeat(4, 1fr);
    }

    // Below the desktop width the row turns into a carousel: a narrower tile
    // leaves the next one peeking, which is the only hint that it scrolls.
    @include bp-down("lg") {
      grid-auto-flow: column;
      grid-auto-columns: min(200px, 34%);
      grid-template-columns: none;
    }

    @include bp-down("md") {
      grid-auto-columns: min(160px, 45%);
      gap: var(--spacing-l);
    }
  }

  &__item {
    min-width: 0;
    scroll-snap-align: start;
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    align-items: center;
    color: var(--color-text-primary);
  }

  &__media {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 1;
    padding: var(--spacing-s);
    overflow: hidden;
    background: var(--color-bg-surface-muted);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      var(--color-overlay-light) 0%,
      var(--color-overlay-light-strong) 90%
    );
    mix-blend-mode: lighten;
  }

  &__image {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__label {
    @include text("heading-xs");

    text-align: center;
  }
}
</style>
