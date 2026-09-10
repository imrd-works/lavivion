type RevealTask = () => Promise<void>;

interface QueuedReveal {
  /** Distance from the top of the document, used to keep document order. */
  position: number;
  run: RevealTask;
}

/** No reveal legitimately runs this long, so a slower one is left behind. */
const TASK_TIMEOUT = 2000;

/** A hidden tab gets no animation frames, so the queue also starts on a timer. */
const START_FALLBACK = 100;

const queue: QueuedReveal[] = [];
let isRunning = false;
let isScheduled = false;

function runTask(task: RevealTask): Promise<void> {
  return Promise.race([
    task(),
    new Promise<void>((resolve) => setTimeout(resolve, TASK_TIMEOUT)),
  ]);
}

async function drain(): Promise<void> {
  if (isRunning) return;
  isRunning = true;

  try {
    while (queue.length > 0) {
      queue.sort((a, b) => a.position - b.position);
      const next = queue.shift();
      if (!next) continue;

      try {
        await runTask(next.run);
      } catch {
        // One broken reveal must not keep every section below it hidden.
      }
    }
  } finally {
    isRunning = false;
  }
}

/**
 * Plays reveal animations one after another instead of letting every section
 * that scrolls into view start at once. Tasks are ordered by their position in
 * the document, so a section never appears before the one above it.
 */
export function enqueueReveal(position: number, run: RevealTask): void {
  queue.push({ position, run });

  // Sections that scroll into view together arrive in the same frame. Waiting
  // for the frame to end lets the queue sort them before the first one starts,
  // otherwise whichever observer fired first would win.
  if (isScheduled) return;
  isScheduled = true;

  const start = () => {
    if (!isScheduled) return;
    isScheduled = false;
    void drain();
  };

  requestAnimationFrame(start);
  setTimeout(start, START_FALLBACK);
}
