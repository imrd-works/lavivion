<script setup lang="ts">
import { ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import IconButton from "@/shared/ui/IconButton/IconButton.vue";
import { useScrollLock } from "@/shared/lib/useScrollLock";

const props = withDefaults(
  defineProps<{
    open: boolean;
    label: string;
    closeOnBackdrop?: boolean;
  }>(),
  {
    closeOnBackdrop: true,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const { t } = useI18n();

const dialog = ref<HTMLDialogElement | null>(null);

useScrollLock(toRef(props, "open"));

watch(
  () => props.open,
  (open) => {
    const element = dialog.value;
    if (!element) return;

    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  },
);

function close(): void {
  emit("update:open", false);
}

// A click on the backdrop reports the dialog itself as its target, because
// the panel covers the whole box.
function onClick(event: MouseEvent): void {
  if (props.closeOnBackdrop && event.target === dialog.value) close();
}
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -- the linter does not know dialog is interactive -->
  <dialog
    ref="dialog"
    class="modal"
    :aria-label="label"
    @click="onClick"
    @keydown.escape="close"
    @close="close"
  >
    <div class="modal__panel">
      <IconButton
        class="modal__close"
        icon="close"
        :label="t('common.close')"
        @click="close"
      />

      <div class="modal__body">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
/** @define modal */
@use "shared/assets/styles/mixins" as *;

.modal {
  // The global reset drops the margin the browser uses to centre a modal
  // dialog, so it is restored here.
  width: min(480px, calc(100% - var(--spacing-3xl)));
  margin: auto;
  padding: 0;
  color: var(--color-text-primary);
  background: transparent;
  border: 0;

  &::backdrop {
    background: rgb(0 45 56 / 40%);
  }

  &[open] {
    animation: modal-appear var(--duration-medium) var(--ease-decelerate);
  }

  &__panel {
    position: relative;
    padding: var(--spacing-3xl);
    background: var(--color-bg-surface);
  }

  &__close {
    position: absolute;
    top: var(--spacing-m);
    right: var(--spacing-m);
  }

  &__body {
    @include text("body-m");

    color: var(--color-text-secondary);
  }
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>
