import { afterEach, describe, expect, it } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import Modal from "./Modal.vue";

// Every dialog has to go away between cases: while one is mounted it still
// holds its share of the page scroll lock.
enableAutoUnmount(afterEach);

const LABEL = "Dialog";

function mountModal(props: Record<string, unknown> = {}) {
  return mount(Modal, {
    props: { open: false, label: LABEL, ...props },
    slots: { default: "<p>form</p>" },
    attachTo: document.body,
  });
}

describe("Modal", () => {
  it("stays shut until the model says otherwise", async () => {
    const wrapper = mountModal();
    const dialog = wrapper.get("dialog").element as HTMLDialogElement;

    expect(dialog.open).toBe(false);

    await wrapper.setProps({ open: true });

    expect(dialog.open).toBe(true);
    expect(wrapper.get("dialog").attributes("aria-label")).toBe(LABEL);
  });

  it("asks to close from the corner button", async () => {
    const wrapper = mountModal({ open: true });

    await wrapper.get(".modal__close").trigger("click");

    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);
  });

  it("asks to close on Escape and on a click outside the panel", async () => {
    const wrapper = mountModal({ open: true });
    const dialog = wrapper.get("dialog");

    await dialog.trigger("keydown", { key: "Escape" });
    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);

    await dialog.trigger("click");
    expect(wrapper.emitted("update:open")).toHaveLength(2);
  });

  it("keeps a click inside the panel to itself", async () => {
    const wrapper = mountModal({ open: true });

    await wrapper.get(".modal__panel").trigger("click");

    expect(wrapper.emitted("update:open")).toBeUndefined();
  });

  it("leaves the click alone when closing on the backdrop is off", async () => {
    const wrapper = mountModal({ open: true, closeOnBackdrop: false });

    await wrapper.get("dialog").trigger("click");

    expect(wrapper.emitted("update:open")).toBeUndefined();
  });

  it("holds the page still while it is open", async () => {
    const wrapper = mountModal();

    await wrapper.setProps({ open: true });
    expect(document.body.style.overflow).toBe("hidden");

    await wrapper.setProps({ open: false });
    expect(document.body.style.overflow).toBe("");
  });
});
