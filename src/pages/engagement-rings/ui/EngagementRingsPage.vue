<script setup lang="ts">
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
const quickFilters = getQuickFilters();
const shelves = getProductShelves();
const collections = getBudgetCollections();
const blog = getBlogPreview();
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
}
</style>
