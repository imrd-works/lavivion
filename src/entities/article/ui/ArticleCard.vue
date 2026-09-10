<script setup lang="ts">
import { Badge } from "@/shared/ui";
import type { Article } from "../model/types";

defineProps<{
  article: Article;
}>();
</script>

<template>
  <article class="article-card">
    <div class="article-card__media">
      <img
        v-if="article.image"
        class="article-card__image"
        :src="article.image"
        alt=""
      />
    </div>

    <div class="article-card__text">
      <ul v-if="article.tags.length" class="article-card__tags">
        <li v-for="tag in article.tags" :key="tag" class="article-card__tag">
          <Badge>{{ tag }}</Badge>
        </li>
      </ul>
      <h3 class="article-card__title">
        <NuxtLink :to="article.to" class="article-card__link">
          {{ article.title }}
        </NuxtLink>
      </h3>
    </div>
  </article>
</template>

<style lang="scss" scoped>
/** @define article-card */
@use "shared/assets/styles/mixins" as *;

.article-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  &__media {
    aspect-ratio: 330 / 440;
    overflow: hidden;
    background: var(--color-bg-surface-muted);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-s);
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__tag {
    display: flex;
  }

  &__title {
    @include text("heading-m");

    margin: 0;
    color: var(--color-text-primary);
  }

  // The link stretches over the card so the whole tile is clickable while the
  // accessible name stays on the article title alone. Its own box is just the
  // title, so the focus ring is drawn around the card instead.
  &__link {
    color: inherit;

    &::after {
      position: absolute;
      inset: 0;
      content: "";
    }

    &:focus-visible {
      outline: none;
    }
  }

  &:has(.article-card__link:focus-visible) {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
</style>
