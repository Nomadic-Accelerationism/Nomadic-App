
export async function GET(req) {
  const url = new URL(req.url);
  const param = url.searchParams.get('wallet'); // Get the parameter from the query string

  if (!param) {
      return new Response(JSON.stringify({ error: 'Parameter is missing' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
      });
  }

  try {
      // Call the external API with the parameter
      const externalRes = await fetch(`http://159.223.228.122/poaps?wallet=${param}`);
      const externalData = await externalRes.json();

      return new Response(JSON.stringify(externalData), {
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
