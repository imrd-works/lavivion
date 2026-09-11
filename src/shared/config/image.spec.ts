import { describe, expect, it } from "vitest";
import { imageSizes } from "./image";

describe("imageSizes", () => {
  it("describes every screen, so the module builds a candidate for each", () => {
    expect(imageSizes({ xs: 100 }).split(" ")).toHaveLength(6);
  });

  it("holds a width until a wider breakpoint overrides it", () => {
    expect(imageSizes({ xs: 100, lg: 50 })).toBe(
      "xs:100vw sm:100vw md:100vw lg:50vw xl:50vw 2xl:50vw",
    );
  });

  it("falls back to the full window when the first screen says nothing", () => {
    expect(imageSizes({ lg: 25 })).toBe(
      "xs:100vw sm:100vw md:100vw lg:25vw xl:25vw 2xl:25vw",
    );
  });
});
