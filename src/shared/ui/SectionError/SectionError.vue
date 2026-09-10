<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "@/shared/ui/Button/Button.vue";

defineEmits<{
  retry: [];
}>();

const { t } = useI18n();
</script>

<template>
  <div class="section-error" role="alert">
    <p class="section-error__message">{{ t("errors.section") }}</p>
    <Button variant="outline" @click="$emit('retry')">
      {{ t("common.retry") }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>
/** @define section-error */
@use "shared/assets/styles/mixins" as *;

.section-error {
  @include hairline(block);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--spacing-2xl);
  text-align: center;

  &__message {
    @include text("body-m");

    margin: 0;
    color: var(--color-text-secondary);
  }
}
</style>
