<script setup lang="ts">
import { useAsyncData } from "#app";
import { useI18n } from "vue-i18n";
import { Container, Divider, SectionError } from "@/shared/ui";
import { ShowcaseHero } from "@/widgets/showcase-hero";
import {
  CatalogFilters,
  CatalogFiltersSkeleton,
} from "@/widgets/catalog-filters";
import { ProductShelf, ProductShelfSkeleton } from "@/widgets/product-shelf";
import { SizeGuideBanner } from "@/widgets/size-guide-banner";
import {
  BudgetCollections,
  BudgetCollectionsSkeleton,
} from "@/widgets/budget-collections";
import { ExpertConsultation } from "@/widgets/expert-consultation";
import { BlogPreview, BlogPreviewSkeleton } from "@/widgets/blog-preview";
import {
  getBlogPreview,
  getBudgetCollections,
  getProductShelves,
  getQuickFilters,
} from "../api";
import { usePageSeo } from "../lib/usePageSeo";

usePageSeo();

const { t } = useI18n();

const {
  data: quickFilters,
  status: quickFiltersStatus,
  error: quickFiltersError,
  refresh: refreshQuickFilters,
} = await useAsyncData("engagement-rings:quick-filters", getQuickFilters, {
  default: () => [],
});

const {
  data: shelves,
  status: shelvesStatus,
  error: shelvesError,
  refresh: refreshShelves,
} = await useAsyncData("engagement-rings:shelves", getProductShelves, {
  default: () => [],
});

const {
  data: collections,
  status: collectionsStatus,
  error: collectionsError,
  refresh: refreshCollections,
} = await useAsyncData("engagement-rings:collections", getBudgetCollections, {
  default: () => [],
});

const {
  data: blog,
  status: blogStatus,
  error: blogError,
  refresh: refreshBlog,
} = await useAsyncData("engagement-rings:blog", getBlogPreview, {
  default: () => ({ total: 0, items: [] }),
});
</script>

<template>
  <Container class="engagement-rings-page">
    <ShowcaseHero
      :title="t('engagementRings.hero.title')"
      :description="t('engagementRings.hero.description')"
      image="/images/hero/engagement-rings.jpg"
    />

    <CatalogFiltersSkeleton v-if="quickFiltersStatus === 'pending'" />
    <SectionError
      v-else-if="quickFiltersError"
      @retry="refreshQuickFilters()"
    />
    <CatalogFilters v-else :quick-filters="quickFilters" />

    <template v-if="shelvesStatus === 'pending'">
      <template v-for="placeholder in 2" :key="placeholder">
        <Divider v-if="placeholder > 1" />
        <ProductShelfSkeleton />
      </template>
    </template>
    <SectionError v-else-if="shelvesError" @retry="refreshShelves()" />
    <template v-for="(shelf, index) in shelves" v-else :key="shelf.category.id">
      <Divider v-if="index > 0" />
      <ProductShelf
        :category="shelf.category"
        :products="shelf.products"
        :to="shelf.to"
      />
    </template>

    <SizeGuideBanner
      class="engagement-rings-page__banner"
      image="/images/banners/size-guide.jpg"
    />

    <BudgetCollectionsSkeleton v-if="collectionsStatus === 'pending'" />
    <SectionError v-else-if="collectionsError" @retry="refreshCollections()" />
    <BudgetCollections
      v-else
      :title="t('engagementRings.budget.title')"
      :collections="collections"
    />

    <Divider />

    <ExpertConsultation image="/images/consultation/expert.jpg" />

    <Divider />

    <BlogPreviewSkeleton v-if="blogStatus === 'pending'" />
    <SectionError v-else-if="blogError" @retry="refreshBlog()" />
    <BlogPreview v-else :articles="blog.items" :total-count="blog.total" />
  </Container>
</template>

<style lang="scss" scoped>
/** @define engagement-rings-page */
@use "shared/assets/styles/mixins" as *;

.engagement-rings-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4xl);
  padding-bottom: var(--spacing-5xl);

  &__banner {
    margin-block: var(--spacing-4xl);
  }

  @include bp-down("md") {
    gap: var(--spacing-3xl);
    padding-bottom: var(--spacing-4xl);

    &__banner {
      margin-block: var(--spacing-3xl);
    }
  }
}
</style>
