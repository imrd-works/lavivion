import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import FiltersBar from "./FiltersBar.vue";

describe("FiltersBar", () => {
  it("starts closed and points the button at its panel", () => {
    const wrapper = mount(FiltersBar);
    const button = wrapper.get("button");
    const panel = wrapper.get(".filters-bar__panel");

    expect(button.attributes("aria-expanded")).toBe("false");
    expect(button.attributes("aria-controls")).toBe(panel.attributes("id"));
    expect(panel.classes()).not.toContain("filters-bar__panel--open");
  });

  it("opens and closes on click", async () => {
    const wrapper = mount(FiltersBar);
    const button = wrapper.get("button");

    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get(".filters-bar__panel").classes()).toContain(
      "filters-bar__panel--open",
    );

    await button.trigger("click");
    expect(button.attributes("aria-expanded")).toBe("false");
  });
});
