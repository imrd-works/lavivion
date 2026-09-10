<script setup lang="ts">
import { Card } from "@/shared/ui";
</script>

<template>
  <Card padding="m" class="showcase-block">
    <p>Card with border and radius.</p>
  </Card>
</template>

<style lang="scss" scoped>
/** @define showcase-block */
.showcase-block {
  background: var(--color-bg-surface-sunken);
  border-radius: var(--radius-s);
}
</style>
