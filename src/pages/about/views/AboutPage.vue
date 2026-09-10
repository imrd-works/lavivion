<script setup lang="ts">
import { usePageSeo } from "../seo/usePageSeo";
import AboutPageContent from "./AboutPageContent.vue";
import { Section, Container } from "@/shared/layout";

usePageSeo();
</script>

<template>
  <div class="about-page-suspense">
    <Suspense>
      <template #default>
        <AboutPageContent />
      </template>
      <template #fallback>
        <Section padding="m">
          <Container padding="m">
            <div class="about-page-suspense__fallback" aria-hidden="true">
              <span class="about-page-suspense__title" />
              <span class="about-page-suspense__text" />
              <div class="about-page-suspense__actions">
                <span class="about-page-suspense__button" />
                <span class="about-page-suspense__button" />
              </div>
            </div>
          </Container>
        </Section>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
/** @define about-page-suspense */

.about-page-suspense {
  &__title,
  &__text,
  &__button {
    display: block;
    background: var(--color-border-subtle);
    border-radius: var(--radius-s);
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
  }

  &__title {
    width: 14rem;
    max-width: 60%;
    height: 1.875rem;
    margin-bottom: var(--spacing-m);
  }

  &__text {
    width: 32rem;
    max-width: 100%;
    height: 1rem;
    margin-bottom: var(--spacing-m);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-m);
  }

  &__button {
    width: 8rem;
    height: 2.5rem;
    border-radius: var(--radius-m);
  }
}
</style>
