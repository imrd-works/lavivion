<script setup lang="ts">
import { useAsyncData } from "#app";
import { useI18n } from "vue-i18n";
import { Container, Divider } from "@/shared/ui";
import { ShowcaseHero } from "@/widgets/showcase-hero";
import { CatalogFilters } from "@/widgets/catalog-filters";
import { ProductShelf } from "@/widgets/product-shelf";
import { SizeGuideBanner } from "@/widgets/size-guide-banner";
import { BudgetCollections } from "@/widgets/budget-collections";
import { ExpertConsultation } from "@/widgets/expert-consultation";
import { BlogPreview } from "@/widgets/blog-preview";
import {
  getBlogPreview,
  getBudgetCollections,
  getProductShelves,
  getQuickFilters,
} from "../api";
import { usePageSeo } from "../lib/usePageSeo";

usePageSeo();

const { t } = useI18n();

const { data: quickFilters } = await useAsyncData(
  "engagement-rings:quick-filters",
  getQuickFilters,
  { default: () => [] },
);
const { data: shelves } = await useAsyncData(
  "engagement-rings:shelves",
  getProductShelves,
  { default: () => [] },
);
const { data: collections } = await useAsyncData(
  "engagement-rings:collections",
  getBudgetCollections,
  { default: () => [] },
);
const { data: blog } = await useAsyncData(
  "engagement-rings:blog",
  getBlogPreview,
  { default: () => ({ total: 0, items: [] }) },
);
</script>

<template>
  <div class="engagement-rings-page">
    <Container>
      <ShowcaseHero
        :title="t('engagementRings.hero.title')"
        :description="t('engagementRings.hero.description')"
        image="/images/hero/engagement-rings.jpg"
      />
    </Container>

    <Container>
      <CatalogFilters :quick-filters="quickFilters" />
    </Container>

    <Container>
      <div class="engagement-rings-page__shelves">
        <template v-for="(shelf, index) in shelves" :key="shelf.category.id">
          <Divider v-if="index > 0" />
          <ProductShelf
            :category="shelf.category"
            :products="shelf.products"
            :to="shelf.to"
          />
        </template>
      </div>
    </Container>

    <Container>
      <SizeGuideBanner
        class="engagement-rings-page__banner"
        image="/images/banners/size-guide.jpg"
      />
    </Container>

    <Container>
      <BudgetCollections
        :title="t('engagementRings.budget.title')"
        :collections="collections"
      />
    </Container>

    <Divider />

    <Container>
      <ExpertConsultation image="/images/consultation/expert.jpg" />
    </Container>

    <Divider />

    <Container>
      <BlogPreview :articles="blog.items" :total-count="blog.total" />
    </Container>
  </div>
</template>

<style lang="scss" scoped>
/** @define engagement-rings-page */
@use "shared/assets/styles/mixins" as *;

.engagement-rings-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4xl);
  padding-bottom: var(--spacing-5xl);

  &__shelves {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4xl);
  }

  &__banner {
    margin-block: var(--spacing-4xl);
  }

  @include bp-down("md") {
    gap: var(--spacing-3xl);
    padding-bottom: var(--spacing-4xl);

    &__shelves {
      gap: var(--spacing-3xl);
    }

    &__banner {
      margin-block: var(--spacing-3xl);
    }
  }
}
</style>
