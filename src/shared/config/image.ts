const SCREENS = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

type Screen = (typeof SCREENS)[number];

/**
 * Describes how wide a picture is rendered, in percent of the window, at each
 * breakpoint. Every screen needs its own entry: the image module builds one
 * candidate per listed screen and leaves the others with an upscaled file, so
 * a width declared here holds until a wider breakpoint overrides it.
 */
export function imageSizes(widths: Partial<Record<Screen, number>>): string {
  let current = 100;

  return SCREENS.map((screen) => {
    current = widths[screen] ?? current;
    return `${screen}:${current}vw`;
  }).join(" ");
}
