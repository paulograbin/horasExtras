export function logEvent(event: string, data?: Record<string, unknown>) {
  const payload = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };

  if (import.meta.env.DEV) {
    console.log('[event]', event, data);
    return;
  }

  navigator.sendBeacon('/api/events', JSON.stringify(payload));
}
