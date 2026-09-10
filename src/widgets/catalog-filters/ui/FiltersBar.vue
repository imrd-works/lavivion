<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";

const { t } = useI18n();
</script>

<template>
  <div class="filters-bar">
    <Button variant="text" icon="filter">
      {{ t("catalogFilters.filters") }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>
/** @define filters-bar */
@use "shared/assets/styles/mixins" as *;

.filters-bar {
  @include hairline(block);

  display: flex;
  gap: var(--spacing-2xl);
  align-items: center;
  padding-block: var(--spacing-2xl);
}
</style>
