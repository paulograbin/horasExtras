export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/events' && request.method === 'POST') {
      const events = await request.json();
      const batch = Array.isArray(events) ? events : [events];
      for (const event of batch) {
        console.log(JSON.stringify(event));
      }
      return new Response(null, { status: 204 });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler;
