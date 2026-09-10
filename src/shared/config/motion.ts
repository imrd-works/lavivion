// Kept in step with the --duration-reveal token: a section that animates in
// CSS instead of through the queue has to look the same.
export const REVEAL_DURATION = 350;

/** Each step starts halfway through the previous one, so a group builds up. */
export const REVEAL_STEP = REVEAL_DURATION / 2;

/** A block appears as a whole. */
export const revealSection = {
  preset: "fade-up",
  trigger: "visible",
  duration: REVEAL_DURATION,
} as const;

/** Children appear one after another instead of the block at once. */
export const revealCascade = {
  ...revealSection,
  target: "children",
  stagger: REVEAL_STEP,
} as const;

/**
 * Cascade without the vertical lift, for children of a scroll container where
 * the shift would spill out of the track.
 */
export const revealCascadeFading = {
  ...revealCascade,
  preset: "fade-in",
} as const;
