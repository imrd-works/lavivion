<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Motion } from "@/shared/ui";
import { ProductCard, type Product } from "@/entities/product";
import { FavoriteButton } from "@/features/toggle-favorite";

const props = defineProps<{
  products: Product[];
  to: string;
  restCount: number;
  revealDuration: number;
  revealDelay: number;
  revealStagger: number;
}>();

const { t } = useI18n();

const featured = computed(() => props.products[0]);
const rest = computed(() => props.products.slice(1));
</script>

<template>
  <Motion
    class="product-shelf-grid"
    preset="fade-up"
    trigger="visible"
    target="children"
    :duration="revealDuration"
    :delay="revealDelay"
    :stagger="revealStagger"
  >
    <ProductCard
      v-if="featured"
      class="product-shelf-grid__featured"
      :product="featured"
      size="large"
    >
      <template #actions>
        <FavoriteButton
          :product-id="featured.id"
          :product-title="featured.title"
        />
      </template>
    </ProductCard>

    <ProductCard v-for="product in rest" :key="product.id" :product="product">
      <template #actions>
        <FavoriteButton
          :product-id="product.id"
          :product-title="product.title"
        />
      </template>
    </ProductCard>

    <Button class="product-shelf-grid__more" variant="link" :to="to">
      {{ t("productShelf.viewAll") }}
      <template #suffix>+{{ restCount }}</template>
    </Button>
  </Motion>
</template>

<style lang="scss" scoped>
/** @define product-shelf-grid */

.product-shelf-grid {
  display: grid;
  // Track ratios mirror the mockup: one wide card next to two narrow columns.
  grid-template-columns: 692fr 342fr 342fr;
  gap: var(--spacing-s);

  &__featured {
    grid-row: 1 / span 2;
  }

  &__more {
    align-self: center;
    justify-self: center;
  }
}
</style>
