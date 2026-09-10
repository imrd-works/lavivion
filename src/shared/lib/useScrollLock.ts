import { onBeforeUnmount, watch, type Ref } from "vue";

let held = 0;
let restore = "";

function lock(): void {
  if (held === 0) {
    restore = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  held += 1;
}

function unlock(): void {
  if (held === 0) return;

  held -= 1;
  if (held === 0) document.body.style.overflow = restore;
}

/**
 * Holds the page still while an overlay is open. Locks are counted, so a
 * dialog opened on top of the mobile menu does not release the page when it
 * closes on its own.
 */
export function useScrollLock(isLocked: Ref<boolean>): void {
  let isHolding = false;

  function apply(locked: boolean): void {
    if (locked === isHolding) return;

    isHolding = locked;
    if (locked) lock();
    else unlock();
  }

  watch(isLocked, apply);

  onBeforeUnmount(() => apply(false));
}
