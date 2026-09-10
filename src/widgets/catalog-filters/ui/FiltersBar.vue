<script setup lang="ts">
import { ref, useId } from "vue";
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";

const { t } = useI18n();

const panelId = useId();
const isOpen = ref(false);
</script>

<template>
  <div class="filters-bar">
    <div class="filters-bar__row">
      <Button
        variant="text"
        icon="filter"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        @click="isOpen = !isOpen"
      >
        {{ t("catalogFilters.filters") }}
      </Button>
    </div>

    <div
      :id="panelId"
      class="filters-bar__panel"
      :class="{ 'filters-bar__panel--open': isOpen }"
    >
      <div class="filters-bar__body">
        <p class="filters-bar__placeholder">
          {{ t("catalogFilters.placeholder") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** @define filters-bar */
@use "shared/assets/styles/mixins" as *;

.filters-bar {
  @include hairline(block);

  &__row {
    display: flex;
    gap: var(--spacing-2xl);
    align-items: center;
    padding-block: var(--spacing-2xl);
  }

  // The panel opens by growing its own grid row: unlike a height transition
  // this needs no measured value and follows whatever the content asks for.
  &__panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--duration-slow) var(--ease-standard);

    &--open {
      grid-template-rows: 1fr;
    }
  }

  &__body {
    overflow: hidden;
    visibility: hidden;
    transition: visibility var(--duration-slow) var(--ease-standard);
  }

  &__panel--open &__body {
    visibility: visible;
  }

  &__placeholder {
    @include text("body-m");

    display: grid;
    place-items: center;
    min-height: 120px;
    padding-bottom: var(--spacing-2xl);
    margin: 0;
    color: var(--color-text-tertiary);
    text-align: center;
  }
}
</style>
