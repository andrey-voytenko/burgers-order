export default async function sendMessage(message: string) {
  const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      chat_id: process.env.CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    }),
  });

  const result = await response.json();
  return Response.json(result.data);
}
