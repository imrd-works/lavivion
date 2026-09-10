<script setup lang="ts">
import { computed } from "vue";
import {
  CategoryHeader,
  type ProductCategory,
} from "@/entities/product-category";
import { Motion } from "@/shared/ui";
import { REVEAL_DURATION, REVEAL_STEP } from "@/shared/config/motion";
import type { Product } from "@/entities/product";
import ProductShelfGrid from "./ProductShelfGrid.vue";

const props = defineProps<{
  category: ProductCategory;
  products: Product[];
  to: string;
}>();

const restCount = computed(() =>
  Math.max(props.category.count - props.products.length, 0),
);
</script>

<template>
  <section class="product-shelf">
    <Motion preset="fade-up" trigger="visible" :duration="REVEAL_DURATION">
      <CategoryHeader :category="category" />
    </Motion>
    <ProductShelfGrid
      :products="products"
      :to="to"
      :rest-count="restCount"
      :reveal-duration="REVEAL_DURATION"
      :reveal-delay="REVEAL_STEP"
      :reveal-stagger="REVEAL_STEP"
    />
  </section>
</template>

<style lang="scss" scoped>
/** @define product-shelf */

.product-shelf {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}
</style>
