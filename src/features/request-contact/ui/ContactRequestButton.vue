<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Modal } from "@/shared/ui";

defineOptions({ inheritAttrs: false });

const { t } = useI18n();

const isOpen = ref(false);
</script>

<template>
  <Button v-bind="$attrs" @click="isOpen = true">
    <slot />
  </Button>

  <Modal v-model:open="isOpen" :label="t('requestContact.label')">
    <p class="contact-request">
      {{ t("requestContact.placeholder") }}
    </p>
  </Modal>
</template>

<style lang="scss" scoped>
/** @define contact-request */

.contact-request {
  display: grid;
  place-items: center;
  min-height: 120px;
  margin: 0;
  text-align: center;
}
</style>
