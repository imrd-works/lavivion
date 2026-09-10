<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ProductMetal } from "../model/types";

defineProps<{
  metals: ProductMetal[];
}>();

const { t } = useI18n();
</script>

<template>
  <ul class="product-swatches" :aria-label="t('product.metalsLabel')">
    <li
      v-for="metal in metals"
      :key="metal"
      class="product-swatches__dot"
      :class="`product-swatches__dot--${metal}`"
    >
      <span class="product-swatches__label">
        {{ t(`product.metals.${metal}`) }}
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
/** @define product-swatches */
@use "shared/assets/styles/mixins" as *;

.product-swatches {
  display: flex;
  gap: var(--spacing-2xs);
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);

    &--white-gold {
      background: var(--color-swatch-white-gold);
    }

    &--yellow-gold {
      background: var(--color-swatch-yellow-gold);
    }

    &--rose-gold {
      background: var(--color-swatch-rose-gold);
    }

    &--platinum {
      background: var(--color-swatch-platinum);
    }
  }

  &__label {
    @include visually-hidden;
  }
}
</style>
