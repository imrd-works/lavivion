<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";
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
  <div class="product-shelf-grid">
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

    <div class="product-shelf-grid__rest">
      <div class="product-shelf-grid__row">
        <ProductCard
          v-for="product in rest.slice(0, 2)"
          :key="product.id"
          :product="product"
        >
          <template #actions>
            <FavoriteButton
              :product-id="product.id"
              :product-title="product.title"
            />
          </template>
        </ProductCard>
      </div>

      <div class="product-shelf-grid__row">
        <ProductCard
          v-for="product in rest.slice(2)"
          :key="product.id"
          :product="product"
        >
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define product-shelf-grid */

.product-shelf-grid {
  display: flex;
  gap: var(--spacing-s);
  align-items: stretch;

  &__featured {
    flex: 1;
    min-width: 0;
  }

  &__rest {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-s);
    min-width: 0;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-s);
  }

  &__more {
    align-self: start;
    justify-self: start;
  }
}
</style>
