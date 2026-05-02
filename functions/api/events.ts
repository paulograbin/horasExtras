interface EventPayload {
  event: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  const payload: EventPayload = await request.json();

  console.log(
    JSON.stringify({
      event: payload.event,
      data: payload.data,
      timestamp: payload.timestamp,
    })
  );

  return new Response(null, { status: 204 });
};
