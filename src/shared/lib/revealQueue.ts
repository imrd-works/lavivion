type RevealTask = () => Promise<void>;

interface QueuedReveal {
  /** Distance from the top of the document, used to keep document order. */
  position: number;
  run: RevealTask;
}

const queue: QueuedReveal[] = [];
let isRunning = false;
let isScheduled = false;

async function drain(): Promise<void> {
  if (isRunning) return;
  isRunning = true;

  while (queue.length > 0) {
    queue.sort((a, b) => a.position - b.position);
    const next = queue.shift();
    if (next) await next.run();
  }

  isRunning = false;
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
  requestAnimationFrame(() => {
    isScheduled = false;
    void drain();
  });
}
