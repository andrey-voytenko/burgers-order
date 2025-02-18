export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: { message: "Message is required"} }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch {
    return new Response(JSON.stringify('Internal Server Error'), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
