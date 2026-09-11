<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Motion } from "@/shared/ui";
import { revealCascade } from "@/shared/config/motion";
import { ProductCard, type Product } from "@/entities/product";
import { FavoriteButton } from "@/features/toggle-favorite";

const props = defineProps<{
  products: Product[];
  to: string;
  restCount: number;
}>();

const { t } = useI18n();

const featured = computed(() => props.products[0]);
const rest = computed(() => props.products.slice(1));
</script>

<template>
  <Motion v-bind="revealCascade" class="product-shelf-grid">
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
@use "shared/assets/styles/mixins" as *;

.product-shelf-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-s);

  &__featured {
    grid-row: 1 / span 2;
    grid-column: span 2;
  }

  // Left to auto-placement on purpose: it lands in the cell the cards leave
  // free, which is where the mockup puts it.
  &__more {
    align-self: center;
    justify-self: center;
  }

  @include bp-down("lg") {
    grid-template-columns: repeat(2, 1fr);

    &__featured {
      grid-row: auto;
    }
  }

  @include bp-down("sm") {
    grid-template-columns: 1fr;

    &__featured {
      grid-column: span 1;
    }

    &__more {
      justify-self: start;
      padding-block: var(--spacing-l);
    }
  }
}
</style>
