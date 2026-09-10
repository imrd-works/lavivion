<script setup lang="ts">
import { computed, watch } from "vue";
import { onKeyStroke, useScrollLock, useVModel } from "@vueuse/core";
import Icon from "@/shared/ui/Icon/Icon.vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    size?: "sm" | "md" | "lg";
    closeOnBackdrop?: boolean;
  }>(),
  {
    title: undefined,
    size: "md",
    closeOnBackdrop: true,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const model = useVModel(props, "modelValue", emit);
const body = computed(() =>
  typeof document === "undefined" ? null : document.body,
);
const isScrollLocked = useScrollLock(body);

watch(
  model,
  (open) => {
    isScrollLocked.value = open;
  },
  { immediate: true },
);

onKeyStroke("Escape", () => {
  if (model.value) model.value = false;
});

function onBackdropClick() {
  if (props.closeOnBackdrop) model.value = false;
}

function onBackdropKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && props.closeOnBackdrop) model.value = false;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal__transition">
      <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
      <div
        v-if="model"
        class="modal__backdrop"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        :aria-labelledby="title ? 'modal-title' : undefined"
        @click.self="onBackdropClick"
        @keydown="onBackdropKeydown"
      >
        <div class="modal" :class="`modal--${size}`">
          <div class="modal__header">
            <span v-if="title" id="modal-title" class="modal__title">
              {{ title }}
            </span>

            <slot name="header" />

            <button
              type="button"
              class="modal__close"
              aria-label="Close"
              @click="model = false"
            >
              <Icon name="close" :size="16" />
            </button>
          </div>

          <div class="modal__body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
/** @define modal */
@use "assets/styles/mixins" as *;

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - var(--spacing-2xl));
  overflow: hidden;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  box-shadow:
    0 8px 32px rgb(15 23 42 / 18%),
    0 2px 8px rgb(15 23 42 / 10%);

  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: grid;
    place-items: center;
    padding: var(--spacing-m);
    background: var(--color-bg-overlay);
  }

  &--sm {
    max-width: 400px;
  }

  &--md {
    max-width: 520px;
  }

  &--lg {
    max-width: 720px;
  }

  &__header {
    display: flex;
    gap: var(--spacing-s);
    align-items: flex-start;
    padding: var(--spacing-l) var(--spacing-l) var(--spacing-m);
  }

  &__title {
    @include text("heading-s");

    flex: 1;
    color: var(--color-text-primary);
  }

  &__close {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--color-text-secondary);
    cursor: pointer;
    background: var(--color-action-secondary-bg);
    border: 0;
    border-radius: var(--radius-m);
    transition:
      color 150ms ease,
      background-color 150ms ease;

    &:hover {
      color: var(--color-text-primary);
      background: var(--color-action-secondary-bg-hover);
    }

    &:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }
  }

  &__body {
    @include text("body-m");

    padding: 0 var(--spacing-l) var(--spacing-l);
    overflow: auto;
    color: var(--color-text-secondary);
  }

  &__footer {
    display: flex;
    gap: var(--spacing-xs);
    align-items: center;
    justify-content: flex-end;
    padding: var(--spacing-m) var(--spacing-l);
    border-top: 1px solid var(--color-border-subtle);
  }
}

.modal__transition-enter-active,
.modal__transition-leave-active {
  transition: opacity 150ms ease;

  .modal {
    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }
}

.modal__transition-enter-from,
.modal__transition-leave-to {
  opacity: 0;

  .modal {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}
</style>
