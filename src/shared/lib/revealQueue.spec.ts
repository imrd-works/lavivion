import { afterEach, describe, expect, it, vi } from "vitest";

async function loadQueue() {
  vi.resetModules();
  return import("./revealQueue");
}

function useTimers() {
  vi.useFakeTimers({
    toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame"],
  });
}

describe("enqueueReveal", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("plays reveals in document order, not in arrival order", async () => {
    useTimers();
    const { enqueueReveal } = await loadQueue();
    const played: number[] = [];

    for (const position of [900, 100, 500]) {
      enqueueReveal(position, async () => {
        played.push(position);
      });
    }
    await vi.advanceTimersByTimeAsync(200);

    expect(played).toEqual([100, 500, 900]);
  });

  it("keeps going after a reveal throws", async () => {
    useTimers();
    const { enqueueReveal } = await loadQueue();
    const played: number[] = [];

    enqueueReveal(100, () => Promise.reject(new Error("gsap is missing")));
    enqueueReveal(200, async () => {
      played.push(200);
    });
    await vi.advanceTimersByTimeAsync(200);

    expect(played).toEqual([200]);
  });

  it("abandons a reveal that never finishes", async () => {
    useTimers();
    const { enqueueReveal } = await loadQueue();
    const played: number[] = [];

    enqueueReveal(100, () => new Promise<void>(() => {}));
    enqueueReveal(200, async () => {
      played.push(200);
    });

    await vi.advanceTimersByTimeAsync(500);
    expect(played).toEqual([]);

    await vi.advanceTimersByTimeAsync(2000);
    expect(played).toEqual([200]);
  });

  it("starts without animation frames, as a hidden tab has none", async () => {
    useTimers();
    const frame = vi
      .spyOn(globalThis, "requestAnimationFrame")
      .mockImplementation(() => 0);
    const { enqueueReveal } = await loadQueue();
    const played: number[] = [];

    enqueueReveal(100, async () => {
      played.push(100);
    });
    await vi.advanceTimersByTimeAsync(200);

    expect(played).toEqual([100]);
    frame.mockRestore();
  });
});
