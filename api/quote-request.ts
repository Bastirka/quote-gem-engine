// Vercel serverless API route — works after deployment to Vercel.
// In Lovable preview the frontend uses the Lovable Cloud edge function instead.
export const config = { runtime: "edge" };

interface Body {
  contact: { name?: string; phone?: string; email?: string; message?: string };
  telegramText: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { contact, telegramText } = (await req.json()) as Body;
    if (!contact || !telegramText) {
      return json({ error: "Invalid payload" }, 400);
    }
    if (!contact.phone && !contact.email) {
      return json({ error: "Missing phone or email" }, 400);
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return json({ error: "Server not configured" }, 500);

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    const tgData = await tgRes.json();
    if (!tgRes.ok || !tgData.ok) return json({ error: "Telegram delivery failed" }, 502);

    return json({ ok: true }, 200);
  } catch {
    return json({ error: "Unexpected error" }, 500);
  }
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
