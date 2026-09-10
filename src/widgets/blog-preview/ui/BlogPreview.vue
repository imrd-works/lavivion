<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";
import { ArticleCard, type Article } from "@/entities/article";
import { allArticlesLink } from "../config/navigation";

const props = defineProps<{
  articles: Article[];
  totalCount: number;
}>();

const { t } = useI18n();

const restCount = computed(() =>
  Math.max(props.totalCount - props.articles.length, 0),
);
</script>

<template>
  <section class="blog-preview">
    <div class="blog-preview__heading">
      <h2 class="blog-preview__title">{{ t("blogPreview.title") }}</h2>
      <Button variant="link" :to="allArticlesLink">
        {{ t("blogPreview.viewAll") }}
        <template #suffix>+{{ restCount }}</template>
      </Button>
    </div>

    <div
      class="blog-preview__viewport"
      role="region"
      tabindex="0"
      :aria-label="t('blogPreview.carouselLabel')"
    >
      <ul class="blog-preview__track">
        <li
          v-for="article in articles"
          :key="article.id"
          class="blog-preview__slide"
        >
          <ArticleCard :article="article" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/** @define blog-preview */
@use "shared/assets/styles/mixins" as *;

.blog-preview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-2xl);
  align-items: start;

  &__heading {
    @include hairline(right);

    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    align-items: flex-start;
    align-self: stretch;
    padding-right: var(--spacing-2xl);
    background: var(--color-bg-surface);
  }

  &__title {
    @include text("heading-xl");

    margin: 0;
    color: var(--color-text-primary);
  }

  &__viewport {
    @include scrollbar-hidden;

    grid-column: span 3;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  &__track {
    display: grid;
    grid-auto-flow: column;
    // Three slides fill the viewport exactly; the rest scroll into view.
    grid-auto-columns: calc((100% - 2 * var(--spacing-2xl)) / 3);
    gap: var(--spacing-2xl);
    align-items: start;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__slide {
    scroll-snap-align: start;
  }
}
</style>
