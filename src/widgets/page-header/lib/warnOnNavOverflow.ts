import { onBeforeUnmount, onMounted, type Ref } from "vue";

/**
 * The widths at which links move into the dropdown are measured from the
 * labels by hand, so renaming a link can quietly push the row into the icons
 * next to it. Nothing in the type check or the linter can see that, hence a
 * message while developing.
 */
export function warnOnNavOverflow(list: Ref<HTMLElement | null>): void {
  if (!import.meta.dev) return;

  let observer: ResizeObserver | null = null;

  function check(): void {
    const element = list.value;
    if (!element) return;

    const overflow = Math.round(element.scrollWidth - element.clientWidth);
    if (overflow <= 1) return;

    console.warn(
      `[page-header] the navigation row overflows by ${overflow}px at ${window.innerWidth}px. ` +
        "Recalculate $collapse-at in PrimaryNav.vue after changing the labels.",
    );
  }

  onMounted(() => {
    check();
    observer = new ResizeObserver(check);
    if (list.value) observer.observe(list.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
  });
}
