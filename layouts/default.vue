<script setup lang="ts">
import { PageHeader } from "@/widgets/page-header";
</script>

<template>
  <div class="default-layout">
    <PageHeader />
    <main class="default-layout__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
/** @define default-layout */

.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
  }
}
</style>
