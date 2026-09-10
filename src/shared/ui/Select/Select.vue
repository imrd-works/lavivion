<script setup lang="ts">
import { computed, useId } from "vue";
import { useVModel } from "@vueuse/core";
import Icon from "@/shared/ui/Icon/Icon.vue";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    error?: string;
    inputId?: string;
  }>(),
  {
    modelValue: undefined,
    placeholder: "Select...",
    label: undefined,
    disabled: false,
    error: undefined,
    inputId: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const model = useVModel(props, "modelValue", emit);
const autoId = useId();
const id = computed(() => props.inputId ?? autoId);
const describedBy = computed(() =>
  props.error ? `${id.value}-error` : undefined,
);
</script>

<template>
  <div
    class="select-field"
    :class="{
      'select-field--error': !!error,
      'select-field--disabled': disabled,
    }"
  >
    <label v-if="label" :for="id" class="select-field__label">
      <span class="select-field__label-text">{{ label }}</span>

      <span class="select-field__wrapper">
        <select
          :id="id"
          v-model="model"
          class="select-field__control"
          :disabled="disabled"
          :aria-invalid="!!error"
          :aria-describedby="describedBy"
        >
          <option v-if="!model" value="" disabled hidden>
            {{ placeholder }}
          </option>

          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </select>

        <span class="select-field__chevron" aria-hidden="true">
          <Icon name="chevrond" :size="16" />
        </span>
      </span>
    </label>

    <div v-else class="select-field__wrapper">
      <select
        :id="id"
        v-model="model"
        class="select-field__control"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="describedBy"
      >
        <option v-if="!model" value="" disabled hidden>
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="select-field__chevron" aria-hidden="true">
        <Icon name="chevrond" :size="16" />
      </span>
    </div>

    <p
      v-if="error"
      :id="`${id}-error`"
      class="select-field__error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
/** @define select-field */
@use "assets/styles/mixins" as *;

.select-field {
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
  }

  &__control {
    @include text("body-m");

    width: 100%;
    padding: var(--spacing-xs) var(--spacing-2xl) var(--spacing-xs)
      var(--spacing-m);
    color: var(--color-text-primary);
    cursor: pointer;
    appearance: none;
    background: var(--color-bg-surface-sunken);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-l);
    outline: none;
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease;

    &:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--color-border-focus) 20%, transparent);
    }
  }

  &__chevron {
    position: absolute;
    right: var(--spacing-m);
    display: inline-flex;
    color: var(--color-text-tertiary);
    pointer-events: none;
    transition: transform 150ms ease;
  }

  &__control:focus ~ &__chevron {
    transform: rotate(180deg);
  }

  &__error {
    @include text("caption");

    margin: 0;
    color: var(--color-text-danger);
  }

  &--error &__control {
    border-color: var(--color-border-danger);

    &:focus {
      border-color: var(--color-border-danger);
      box-shadow: 0 0 0 3px
        color-mix(in srgb, var(--color-border-danger) 20%, transparent);
    }
  }

  &--disabled &__control {
    color: var(--color-text-disabled);
    cursor: not-allowed;
    background: var(--color-action-primary-bg-disabled);
  }

  &--disabled &__chevron,
  &--disabled &__label-text {
    color: var(--color-text-disabled);
  }
}
</style>
