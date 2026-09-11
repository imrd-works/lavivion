import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { IconButton } from "@/shared/ui";
import { useFavoritesStore } from "../model/store";
import FavoriteButton from "./FavoriteButton.vue";

const PRODUCT = { productId: "lyre-1", productTitle: "Lyre" };

function mountButton() {
  return mount(FavoriteButton, { props: PRODUCT });
}

describe("FavoriteButton", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts unpressed and marks the ring on click", async () => {
    const wrapper = mountButton();
    const store = useFavoritesStore();

    expect(wrapper.attributes("aria-pressed")).toBe("false");

    await wrapper.trigger("click");

    expect(store.isFavorite(PRODUCT.productId)).toBe(true);
    expect(wrapper.attributes("aria-pressed")).toBe("true");
  });

  it("takes the ring back out on a second click", async () => {
    const wrapper = mountButton();
    const store = useFavoritesStore();

    await wrapper.trigger("click");
    await wrapper.trigger("click");

    expect(store.isFavorite(PRODUCT.productId)).toBe(false);
    expect(wrapper.attributes("aria-pressed")).toBe("false");
  });

  it("swaps the outline heart for the filled one", async () => {
    const wrapper = mountButton();
    const icon = wrapper.getComponent(IconButton);

    expect(icon.props("icon")).toBe("heart");

    await wrapper.trigger("click");

    expect(icon.props("icon")).toBe("heart-filled");
    expect(wrapper.classes()).toContain("favorite-button--active");
  });

  it("says in its label what the click will do", async () => {
    const wrapper = mountButton();
    const idle = wrapper.attributes("aria-label");

    await wrapper.trigger("click");

    expect(idle).toContain(PRODUCT.productTitle);
    expect(wrapper.attributes("aria-label")).not.toBe(idle);
  });
});
