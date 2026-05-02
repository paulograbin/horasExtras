export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/events' && request.method === 'POST') {
      const payload = await request.json();
      console.log(JSON.stringify(payload));
      return new Response(null, { status: 204 });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler;
