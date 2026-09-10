<script setup lang="ts">
import { Grid, Box } from "@/shared/layout";
</script>

<template>
  <Grid :columns="3" gap="m" class="showcase-block">
    <Box padding="s" class="showcase-block__cell">1</Box>
    <Box padding="s" class="showcase-block__cell">2</Box>
    <Box padding="s" class="showcase-block__cell">3</Box>
  </Grid>
</template>

<style lang="scss" scoped>
/** @define showcase-block */
.showcase-block {
  background: var(--color-bg-surface-sunken);
  border-radius: var(--radius-s);
}

.showcase-block__cell {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-s);
}
</style>
