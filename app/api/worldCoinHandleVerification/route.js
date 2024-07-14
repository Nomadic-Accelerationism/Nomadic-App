
export async function GET(req) {
  const url = new URL(req.url);
  const param = url.searchParams.get('proof'); // Get the parameter from the query string

  if (!param) {
      return new Response(JSON.stringify({ error: 'Parameter is missing' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
      });
  }

  try {
      // Call the external API with the parameter
      // Store World Coin Proof

      return new Response(JSON.stringify({process: "ok"}), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data from external API' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  }
}
