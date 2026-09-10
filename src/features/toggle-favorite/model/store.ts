import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const ids = ref(new Set<string>());

  function isFavorite(id: string): boolean {
    return ids.value.has(id);
  }

  function toggle(id: string): void {
    if (ids.value.has(id)) {
      ids.value.delete(id);
    } else {
      ids.value.add(id);
    }
  }

  return { ids, isFavorite, toggle };
});
