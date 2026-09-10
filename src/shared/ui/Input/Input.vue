<script setup lang="ts">
import { computed, useId } from "vue";
import { useVModel } from "@vueuse/core";
import Icon from "@/shared/ui/Icon/Icon.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: "text" | "email" | "password" | "search" | "url" | "tel";
    placeholder?: string;
    label?: string;
    icon?: string;
    error?: string;
    readonly?: boolean;
    disabled?: boolean;
    maxlength?: number;
    hint?: string;
    inputId?: string;
    multiline?: boolean;
    rows?: number;
  }>(),
  {
    modelValue: "",
    type: "text",
    placeholder: undefined,
    label: undefined,
    icon: undefined,
    error: undefined,
    readonly: false,
    disabled: false,
    maxlength: undefined,
    hint: undefined,
    inputId: undefined,
    multiline: false,
    rows: 4,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const model = useVModel(props, "modelValue", emit, { defaultValue: "" });
const autoId = useId();
const id = computed(() => props.inputId ?? autoId);
const charCount = computed(() => model.value.length);
const describedBy = computed(() => {
  if (props.error) return `${id.value}-error`;
  if (props.hint) return `${id.value}-hint`;

  return undefined;
});
</script>

<template>
  <div
    class="input-field"
    :class="{
      'input-field--error': !!error,
      'input-field--disabled': disabled,
      'input-field--readonly': readonly && !disabled,
    }"
  >
    <label v-if="label" :for="id" class="input-field__label">
      <span class="input-field__label-text">{{ label }}</span>

      <span
        class="input-field__wrapper"
        :class="{ 'input-field__wrapper--multiline': multiline }"
      >
        <span v-if="icon" class="input-field__icon" aria-hidden="true">
          <Icon :name="icon" :size="18" />
        </span>

        <textarea
          v-if="multiline"
          :id="id"
          v-model="model"
          class="input-field__control input-field__control--textarea"
          :class="{ 'input-field__control--has-icon': !!icon }"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :rows="rows"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
        />

        <input
          v-else
          :id="id"
          v-model="model"
          class="input-field__control"
          :class="{ 'input-field__control--has-icon': !!icon }"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
        />

        <span
          v-if="maxlength !== undefined"
          class="input-field__counter"
          aria-live="polite"
        >
          {{ charCount }} / {{ maxlength }}
        </span>
      </span>
    </label>

    <div
      v-else
      class="input-field__wrapper"
      :class="{ 'input-field__wrapper--multiline': multiline }"
    >
      <span v-if="icon" class="input-field__icon" aria-hidden="true">
        <Icon :name="icon" :size="18" />
      </span>

      <textarea
        v-if="multiline"
        :id="id"
        v-model="model"
        class="input-field__control input-field__control--textarea"
        :class="{ 'input-field__control--has-icon': !!icon }"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
      />

      <input
        v-else
        :id="id"
        v-model="model"
        class="input-field__control"
        :class="{ 'input-field__control--has-icon': !!icon }"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
      />

      <span
        v-if="maxlength !== undefined"
        class="input-field__counter"
        aria-live="polite"
      >
        {{ charCount }} / {{ maxlength }}
      </span>
    </div>

    <p
      v-if="error"
      :id="`${id}-error`"
      class="input-field__message input-field__message--error"
      role="alert"
    >
      {{ error }}
    </p>

    <p v-else-if="hint" :id="`${id}-hint`" class="input-field__message">
      {{ hint }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
/** @define input-field */
@use "assets/styles/mixins" as *;

.input-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);

  &__label {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  &__label-text {
    @include text("label-s");

    color: var(--color-text-tertiary);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;

    &--multiline {
      align-items: flex-start;
    }
  }

  &__icon {
    position: absolute;
    left: var(--spacing-s);
    display: inline-flex;
    color: var(--color-text-tertiary);
    pointer-events: none;
    transition: color 150ms ease;
  }

  &__control {
    @include text("body-m");

    width: 100%;
    padding: var(--spacing-xs) var(--spacing-m);
    color: var(--color-text-primary);
    background: var(--color-bg-surface-sunken);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-l);
    outline: none;
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease;

    &::placeholder {
      color: var(--color-text-tertiary);
    }

    &--has-icon {
      padding-left: calc(var(--spacing-s) + 18px + var(--spacing-xs));
    }

    &:not(:last-child) {
      padding-right: var(--spacing-4xl);
    }

    &:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--color-border-focus) 20%, transparent);
    }

    &--textarea {
      min-height: 100px;
      align-self: stretch;
      padding-bottom: calc(var(--spacing-xs) + 1.4em + var(--spacing-2xs));
      resize: vertical;
    }
  }

  &__wrapper:focus-within &__icon {
    color: var(--color-border-focus);
  }

  &__counter {
    @include text("caption");

    position: absolute;
    top: 50%;
    right: var(--spacing-s);
    padding: 1px var(--spacing-2xs);
    color: var(--color-text-tertiary);
    white-space: nowrap;
    pointer-events: none;
    background: var(--color-bg-surface-sunken);
    border-radius: var(--radius-s);
    transform: translateY(-50%);
  }

  &__wrapper--multiline &__counter {
    top: auto;
    bottom: var(--spacing-xs);
    transform: none;
  }

  &__message {
    @include text("caption");

    margin: 0;
    color: var(--color-text-secondary);

    &--error {
      color: var(--color-text-danger);
    }
  }

  &--error &__control {
    border-color: var(--color-border-danger);

    &:focus {
      border-color: var(--color-border-danger);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--color-border-danger) 20%, transparent);
    }
  }

  &--error &__icon {
    color: var(--color-text-danger);
  }

  &--disabled &__control {
    color: var(--color-text-disabled);
    cursor: not-allowed;
    background: var(--color-action-primary-bg-disabled);
    border-color: var(--color-border-subtle);
  }

  &--disabled &__icon,
  &--disabled &__label {
    color: var(--color-text-disabled);
  }

  &--disabled &__counter {
    background: var(--color-action-primary-bg-disabled);
  }

  &--readonly &__control {
    color: var(--color-text-secondary);
    cursor: default;
    background: var(--color-bg-surface-sunken);
    border-color: var(--color-border-subtle);

    &:focus {
      border-color: var(--color-border-subtle);
      box-shadow: none;
    }
  }

  &--readonly &__icon {
    color: var(--color-text-disabled);
  }
}
</style>
