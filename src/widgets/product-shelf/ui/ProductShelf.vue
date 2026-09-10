<script setup lang="ts">
import { computed } from "vue";
import {
  CategoryHeader,
  type ProductCategory,
} from "@/entities/product-category";
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
    <CategoryHeader :category="category" />
    <ProductShelfGrid :products="products" :to="to" :rest-count="restCount" />
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
