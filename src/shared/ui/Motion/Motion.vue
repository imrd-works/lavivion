<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { enqueueReveal } from "@/shared/lib/revealQueue";

// gsap is loaded lazily (see loadGsap) so it lands in its own async chunk
// instead of the initial JS of every route that renders <Motion>.
type GsapApi = (typeof import("gsap"))["gsap"];
type GsapTween = ReturnType<GsapApi["fromTo"]>;

type MotionPreset =
  | "fade-up"
  | "fade-in"
  | "scale-in"
  | "slide-left"
  | "slide-right"
  | "none";
type MotionTarget = "self" | "children";
type MotionTrigger = "mount" | "visible";
type MotionVars = Record<string, string | number | boolean>;

const props = withDefaults(
  defineProps<{
    tag?: string;
    preset?: MotionPreset;
    target?: MotionTarget;
    trigger?: MotionTrigger;
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    once?: boolean;
    disabled?: boolean;
    from?: MotionVars;
    to?: MotionVars;
  }>(),
  {
    tag: "div",
    preset: "fade-up",
    target: "self",
    trigger: "mount",
    delay: 0,
    stagger: 0,
    duration: 500,
    ease: "power2.out",
    once: true,
    disabled: false,
    from: undefined,
    to: undefined,
  },
);

const presetVars: Record<MotionPreset, { from: MotionVars; to: MotionVars }> = {
  "fade-up": {
    from: { opacity: 0, y: 24 },
    to: { opacity: 1, y: 0 },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "scale-in": {
    from: { opacity: 0, scale: 0.96 },
    to: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    from: { opacity: 0, x: 24 },
    to: { opacity: 1, x: 0 },
  },
  "slide-right": {
    from: { opacity: 0, x: -24 },
    to: { opacity: 1, x: 0 },
  },
  none: {
    from: {},
    to: {},
  },
};

const el = ref<HTMLElement | null>(null);

// Rendered on the server so the element is already hidden at first paint:
// applying the "from" state only after gsap loads would flash the content.
const pending = ref(props.preset !== "none" && !props.disabled);

const classes = computed(() => [
  "motion",
  `motion--${props.preset}`,
  { "motion--pending": pending.value },
]);

let observer: IntersectionObserver | null = null;
let tween: GsapTween | null = null;
let gsapInstance: GsapApi | null = null;

async function loadGsap(): Promise<GsapApi> {
  if (!gsapInstance) gsapInstance = (await import("gsap")).gsap;
  return gsapInstance;
}

function toSeconds(value: number) {
  return value / 1000;
}

function prefersReducedMotion() {
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

function getTargets() {
  if (!el.value) return null;

  if (props.target === "children") {
    const children = Array.from(el.value.children);
    return children.length > 0 ? children : null;
  }

  return el.value;
}

function getMotionVars() {
  const preset = presetVars[props.preset];

  return {
    from: props.from ?? preset.from,
    to: props.to ?? preset.to,
  };
}

function cleanupTween() {
  tween?.kill();
  tween = null;
}

function targetCount(targets: Element | Element[]): number {
  return Array.isArray(targets) ? targets.length : 1;
}

/**
 * When the next queued reveal may start: halfway through the last element of
 * this one, the same overlap the children of a cascade have between them.
 */
function handoverMs(count: number): number {
  const stagger = props.target === "children" ? props.stagger : 0;
  return props.delay + stagger * Math.max(count - 1, 0) + props.duration / 2;
}

async function animate(): Promise<void> {
  if (props.disabled || props.preset === "none" || prefersReducedMotion())
    return;

  const targets = getTargets();
  if (!targets) return;

  const gsap = await loadGsap();
  const { from, to } = getMotionVars();

  cleanupTween();

  tween = gsap.fromTo(targets, from, {
    ...to,
    delay: toSeconds(props.delay),
    duration: toSeconds(props.duration),
    ease: props.ease,
    stagger: props.target === "children" ? toSeconds(props.stagger) : 0,
    clearProps: "opacity,transform",
  });

  await new Promise<void>((resolve) => {
    setTimeout(resolve, handoverMs(targetCount(targets)));
  });
}

let hasRevealed = false;

/** Skips the animation for a section the reader has already scrolled past. */
async function reveal(): Promise<void> {
  if (hasRevealed) return;
  hasRevealed = true;

  const element = el.value;
  const targets = getTargets();

  if (element && targets && element.getBoundingClientRect().bottom < 0) {
    const gsap = await loadGsap();
    gsap.set(targets, getMotionVars().to);
    return;
  }

  await animate();
}

async function setupVisibleTrigger() {
  const targets = getTargets();
  if (!el.value || !targets) return;

  const gsap = await loadGsap();
  const { from } = getMotionVars();
  gsap.set(targets, from as CSSProperties);

  observer = new IntersectionObserver((entries) => {
    if (!entries[0]?.isIntersecting || !el.value) return;

    const position = el.value.getBoundingClientRect().top + window.scrollY;
    enqueueReveal(position, reveal);

    if (props.once) {
      observer?.disconnect();
      observer = null;
    }
  });

  observer.observe(el.value);
}

onMounted(async () => {
  try {
    await nextTick();

    if (props.disabled || props.preset === "none" || prefersReducedMotion())
      return;

    if (props.trigger === "visible") {
      await setupVisibleTrigger();
      return;
    }

    await animate();
  } finally {
    // Whatever went wrong above — a missing gsap chunk most of all — the class
    // that hides the section until it is ready has to come off.
    pending.value = false;
  }
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
  cleanupTween();
});
</script>

<template>
  <component :is="tag" ref="el" :class="classes">
    <slot />
  </component>
</template>
