<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { IconButton } from "@/shared/ui";
import { useFavoritesStore } from "../model/store";

const props = defineProps<{
  productId: string;
  productTitle: string;
}>();

const { t } = useI18n();
const favorites = useFavoritesStore();

const isActive = computed(() => favorites.isFavorite(props.productId));

const icon = computed(() => (isActive.value ? "heart-filled" : "heart"));

const label = computed(() =>
  t(isActive.value ? "toggleFavorite.remove" : "toggleFavorite.add", {
    title: props.productTitle,
  }),
);
</script>

<template>
  <IconButton
    class="favorite-button"
    :class="{ 'favorite-button--active': isActive }"
    :icon="icon"
    :label="label"
    :pressed="isActive"
    @click="favorites.toggle(productId)"
  />
</template>

<style lang="scss" scoped>
/** @define favorite-button */

.favorite-button {
  transition: color var(--duration-fast) var(--ease-standard);

  &--active {
    color: var(--color-icon-favorite-active);
  }
}
</style>
