<script setup lang="ts">
import { Box } from "@/shared/layout";
</script>

<template>
  <Box padding="m" class="showcase-block">
    <p>Box with padding.</p>
  </Box>
</template>

<style lang="scss" scoped>
/** @define showcase-block */
.showcase-block {
  background: var(--color-bg-surface-sunken);
  border-radius: var(--radius-s);
}
</style>
