<template>
  <hr class="divider" />
</template>

<style lang="scss" scoped>
/** @define divider */

// Zero height with an absolutely drawn rule: a bordered element would add a
// pixel to every section it separates.
.divider {
  position: relative;
  height: 0;
  margin: 0;
  border: 0;

  &::before {
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 1px;
    background: var(--color-border-subtle);
    content: "";
  }
}
</style>
