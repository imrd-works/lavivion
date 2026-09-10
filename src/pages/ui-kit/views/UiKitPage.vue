<script setup lang="ts">
import { ref } from "vue";
import { Section, Container } from "@/shared/layout";
import { usePageSeo } from "../seo/usePageSeo";
import {
  SectionShowcase,
  ContainerShowcase,
  GridShowcase,
  FlexUtilsShowcase,
  BoxShowcase,
  CardShowcase,
} from "./showcases";

usePageSeo();
const showcases = [
  { id: "section", title: "Section", component: SectionShowcase },
  { id: "container", title: "Container", component: ContainerShowcase },
  { id: "grid", title: "Grid", component: GridShowcase },
  {
    id: "flex-utils",
    title: "Flex / Gap (utils)",
    component: FlexUtilsShowcase,
  },
  { id: "box", title: "Box", component: BoxShowcase },
  { id: "card", title: "Card", component: CardShowcase },
] as const;

const openSections = ref<Record<string, boolean>>(
  Object.fromEntries(showcases.map((s) => [s.id, s.id === "section"])),
);

function toggle(id: string) {
  openSections.value[id] = !openSections.value[id];
}
</script>

<template>
  <div class="ui-kit-page">
    <Section padding="l">
      <Container>
        <h1 class="ui-kit-page__title">UI Kit</h1>
        <p class="ui-kit-page__desc">
          Shared layout components. Use in dev mode only.
        </p>

        <div class="ui-kit-page__accordions">
          <div
            v-for="showcase in showcases"
            :key="showcase.id"
            class="accordion"
          >
            <button
              type="button"
              class="accordion__trigger"
              :aria-expanded="openSections[showcase.id]"
              :aria-controls="`showcase-${showcase.id}`"
              @click="toggle(showcase.id)"
            >
              {{ showcase.title }}
            </button>
            <div
              v-show="openSections[showcase.id]"
              :id="`showcase-${showcase.id}`"
              class="accordion__content"
            >
              <component :is="showcase.component" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
/** @define ui-kit-page */
@use "assets/styles/mixins" as *;

.ui-kit-page {
  &__title {
    margin-bottom: var(--spacing-s);
    @include text("heading-xl");
  }

  &__desc {
    margin-bottom: var(--spacing-xl);
    color: var(--color-text-secondary);
  }

  &__accordions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}

/** @define accordion */
.accordion {
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-m);
  overflow: hidden;

  &__trigger {
    width: 100%;
    padding: var(--spacing-m);
    text-align: left;
    background: var(--color-bg-surface-sunken);
    border: none;
    cursor: pointer;
    @include text("label-l");

    &:hover {
      background: var(--color-action-secondary-bg-hover);
    }
  }

  &__content {
    padding: var(--spacing-m);
    border-top: 1px solid var(--color-border-subtle);
  }
}
</style>
