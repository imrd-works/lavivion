<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { PageHeader } from "@/widgets/page-header";
import { PageFooter } from "@/widgets/page-footer";

const { t } = useI18n();
</script>

<template>
  <div class="default-layout">
    <a class="default-layout__skip" href="#content">
      {{ t("common.skipToContent") }}
    </a>
    <PageHeader />
    <main id="content" class="default-layout__main" tabindex="-1">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
/** @define default-layout */
@use "shared/assets/styles/mixins" as *;

.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  // Hidden until the first Tab: it lets a keyboard reader jump past the
  // header instead of walking through every link in it on each page.
  &__skip {
    @include visually-hidden;

    &:focus-visible {
      @include text("heading-xs");

      position: fixed;
      top: var(--spacing-m);
      left: var(--spacing-m);
      z-index: var(--z-sticky);
      width: auto;
      height: auto;
      padding: var(--spacing-s) var(--spacing-l);
      margin: 0;
      overflow: visible;
      clip: auto;
      color: var(--color-text-inverse);
      background: var(--color-action-primary-bg);
    }
  }

  &__main {
    flex: 1;

    &:focus {
      outline: none;
    }
  }
}
</style>
