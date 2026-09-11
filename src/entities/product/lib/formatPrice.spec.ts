import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("keeps prices whole", () => {
    expect(normalise(formatPrice(166350))).toBe("166 350 ₽");
  });

  it("rounds fractions away", () => {
    expect(normalise(formatPrice(1999.6))).toBe("2 000 ₽");
  });
});

/** Grouping and currency separators are non-breaking spaces in ru-RU. */
function normalise(value: string): string {
  return value.replace(/\s/g, " ");
}
