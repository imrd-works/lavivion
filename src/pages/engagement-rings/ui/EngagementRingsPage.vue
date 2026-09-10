<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Container } from "@/shared/ui";
import { ShowcaseHero } from "@/widgets/showcase-hero";
import { CatalogFilters } from "@/widgets/catalog-filters";
import { getQuickFilters } from "../api";
import { usePageSeo } from "../lib/usePageSeo";

usePageSeo();

const { t } = useI18n();
const quickFilters = getQuickFilters();
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
  </div>
</template>

<style lang="scss" scoped>
/** @define engagement-rings-page */

.engagement-rings-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4xl);
  padding-bottom: var(--spacing-5xl);
}
</style>
