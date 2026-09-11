import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref, type Ref } from "vue";
import { mount } from "@vue/test-utils";

type Lock = (isLocked: Ref<boolean>) => void;

let useScrollLock: Lock;

function mountWithLock(isLocked: Ref<boolean>) {
  return mount(
    defineComponent({
      setup() {
        useScrollLock(isLocked);
        return () => h("div");
      },
    }),
  );
}

describe("useScrollLock", () => {
  beforeEach(async () => {
    // The module counts locks in its own state, so every case starts fresh.
    vi.resetModules();
    ({ useScrollLock } = await import("./useScrollLock"));
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("holds the page still while the flag is on", async () => {
    const isLocked = ref(false);
    mountWithLock(isLocked);

    isLocked.value = true;
    await nextTick();
    expect(document.body.style.overflow).toBe("hidden");

    isLocked.value = false;
    await nextTick();
    expect(document.body.style.overflow).toBe("");
  });

  it("counts overlays, so closing the upper one keeps the page locked", async () => {
    const sidebar = ref(false);
    const dialog = ref(false);
    mountWithLock(sidebar);
    mountWithLock(dialog);

    sidebar.value = true;
    dialog.value = true;
    await nextTick();
    expect(document.body.style.overflow).toBe("hidden");

    dialog.value = false;
    await nextTick();
    expect(document.body.style.overflow).toBe("hidden");

    sidebar.value = false;
    await nextTick();
    expect(document.body.style.overflow).toBe("");
  });

  it("releases the page when the component goes away", async () => {
    const isLocked = ref(false);
    const wrapper = mountWithLock(isLocked);

    isLocked.value = true;
    await nextTick();
    wrapper.unmount();

    expect(document.body.style.overflow).toBe("");
  });
});
