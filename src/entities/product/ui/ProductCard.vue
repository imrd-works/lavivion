<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Badge } from "@/shared/ui";
import { imageSizes } from "@/shared/config/image";
import type { Product } from "../model/types";
import { formatPrice } from "../lib/formatPrice";
import ProductSwatches from "./ProductSwatches.vue";

const props = withDefaults(
  defineProps<{
    product: Product;
    size?: "large" | "small";
  }>(),
  {
    size: "small",
  },
);

const sizes = computed(() =>
  props.size === "large"
    ? imageSizes({ xs: 100, lg: 50 })
    : imageSizes({ xs: 100, sm: 50, lg: 25 }),
);

const { t } = useI18n();
</script>

<template>
  <article class="product-card" :class="`product-card--${size}`">
    <div class="product-card__media">
      <NuxtImg
        class="product-card__image"
        :src="product.image"
        :sizes="sizes"
        loading="lazy"
        preset="photo"
        alt=""
      />
      <Badge v-if="product.badge" class="product-card__badge" trademark>
        {{ product.badge }}
      </Badge>
      <div v-if="$slots.actions" class="product-card__actions">
        <slot name="actions" />
      </div>
    </div>

    <div class="product-card__info">
      <h3 class="product-card__title">
        <NuxtLink :to="product.to" class="product-card__link">
          {{ product.title }}
        </NuxtLink>
      </h3>
      <p class="product-card__subtitle">{{ product.subtitle }}</p>
      <div class="product-card__footer">
        <p class="product-card__price">
          {{
            t("product.priceFrom", { price: formatPrice(product.priceFrom) })
          }}
        </p>
        <ProductSwatches :metals="product.metals" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
/** @define product-card */
@use "shared/assets/styles/mixins" as *;

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-surface-subtle);

  &__media {
    position: relative;
    overflow: hidden;
  }

  &--large &__media {
    flex: 1;
    min-height: 0;
  }

  &--small &__media {
    aspect-ratio: 1;
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__badge {
    position: absolute;
    z-index: var(--z-docked);
  }

  &--large &__badge {
    top: var(--spacing-s);
    left: var(--spacing-s);
  }

  &--small &__badge {
    top: 0;
    left: 0;
  }

  &__actions {
    position: absolute;
    top: var(--spacing-s);
    right: var(--spacing-s);
    z-index: var(--z-docked);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
    padding: var(--spacing-s) var(--spacing-m) var(--spacing-m);
  }

  &__title {
    @include text("body-m-light");
    @include truncate;

    margin: 0;
    color: var(--color-text-primary);
  }

  // The link stretches over the whole card so the entire tile is clickable
  // while the accessible name stays on the product title alone. Its own box is
  // the truncated title, so the focus ring is drawn around the card instead.
  &__link {
    color: inherit;

    &::after {
      position: absolute;
      inset: 0;
      content: "";
    }

    &:focus-visible {
      outline: none;
    }
  }

  &:has(.product-card__link:focus-visible) {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }

  &__subtitle {
    @include text("body-s-light");
    @include truncate;

    margin: 0;
    color: var(--color-text-tertiary);
  }

  &__footer {
    display: flex;
    gap: var(--spacing-xs);
    align-items: center;
    padding-right: var(--spacing-s);
  }

  &__price {
    @include text("body-m-medium");

    flex: 1;
    margin: 0;
    color: var(--color-text-primary);
    white-space: nowrap;
  }

  // Off the two-row desktop grid the large card has no row to fill, so its
  // media needs an explicit ratio instead of stretching.
  @include bp-down("lg") {
    &--large &__media {
      flex: none;
      aspect-ratio: 16 / 10;
    }
  }
}
</style>
