import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { primaryLinks } from "../config/navigation";
import PrimaryNav from "./PrimaryNav.vue";

function mountNav() {
  return mount(PrimaryNav, { props: { links: primaryLinks } });
}

describe("PrimaryNav", () => {
  it("renders every link twice: in the row and in the dropdown", () => {
    const wrapper = mountNav();

    expect(
      wrapper.findAll(".primary-nav__item:not(.primary-nav__more)"),
    ).toHaveLength(primaryLinks.length);
    expect(wrapper.findAll(".primary-nav__menu-item")).toHaveLength(
      primaryLinks.length,
    );
  });

  it("keeps the dropdown shut until it is asked", async () => {
    const wrapper = mountNav();
    const trigger = wrapper.get(".primary-nav__trigger");

    expect(trigger.attributes("aria-expanded")).toBe("false");
    expect(wrapper.get(".primary-nav__menu").classes()).not.toContain(
      "primary-nav__menu--open",
    );

    await trigger.trigger("click");

    expect(trigger.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get(".primary-nav__menu").classes()).toContain(
      "primary-nav__menu--open",
    );
  });

  it("opens on keyboard focus and closes on Escape", async () => {
    const wrapper = mountNav();
    const trigger = wrapper.get(".primary-nav__trigger");

    await wrapper.get(".primary-nav__more").trigger("focusin");
    expect(trigger.attributes("aria-expanded")).toBe("true");

    await trigger.trigger("keydown.escape");
    expect(trigger.attributes("aria-expanded")).toBe("false");
  });

  it("sends both copies of a link to the same route", () => {
    const wrapper = mountNav();
    const row = wrapper
      .findAll(".primary-nav__item:not(.primary-nav__more) .primary-nav__link")
      .map((link) => link.attributes("to"));
    const menu = wrapper
      .findAll(".primary-nav__menu-link")
      .map((link) => link.attributes("to"));

    expect(row).toEqual(primaryLinks.map((link) => link.to));
    expect(menu).toEqual(row);
  });
});
