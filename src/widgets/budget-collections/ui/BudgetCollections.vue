<script setup lang="ts">
import { Motion } from "@/shared/ui";
import { REVEAL_DURATION, REVEAL_STEP } from "@/shared/config/motion";
import { CollectionCard, type Collection } from "@/entities/collection";

defineProps<{
  title: string;
  collections: Collection[];
}>();
</script>

<template>
  <section class="budget-collections">
    <Motion preset="fade-up" trigger="visible" :duration="REVEAL_DURATION">
      <h2 class="budget-collections__title">{{ title }}</h2>
    </Motion>
    <Motion
      class="budget-collections__grid"
      preset="fade-up"
      trigger="visible"
      target="children"
      :duration="REVEAL_DURATION"
      :delay="REVEAL_STEP"
      :stagger="REVEAL_STEP"
    >
      <CollectionCard
        v-for="collection in collections"
        :key="collection.id"
        class="budget-collections__card"
        :class="{
          'budget-collections__card--featured': collection.featured,
        }"
        :collection="collection"
      />
    </Motion>
  </section>
</template>

<style lang="scss" scoped>
/** @define budget-collections */
@use "shared/assets/styles/mixins" as *;

.budget-collections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);

  &__title {
    @include text("heading-xl");

    margin: 0;
    color: var(--color-text-primary);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-2xl);
  }

  &__card--featured {
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
  }
}
</style>
