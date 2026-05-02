interface EventEntry {
  event: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

let queue: EventEntry[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_INTERVAL = 5000;

function flush() {
  if (queue.length === 0) return;
  const batch = queue;
  queue = [];
  navigator.sendBeacon('/api/events', JSON.stringify(batch));
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL);
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
}

export function logEvent(event: string, data?: Record<string, unknown>) {
  const entry: EventEntry = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };

  if (import.meta.env.DEV) {
    console.log('[event]', event, data);
    return;
  }

  queue.push(entry);
  scheduleFlush();
}
