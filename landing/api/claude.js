// Proxy serverless para la API de Anthropic.
// La API key vive como variable de entorno en Vercel (ANTHROPIC_API_KEY),
// nunca en el repositorio ni en el navegador.
export default async function handler(req, res) {
  if (req.query && req.query.debug === "1") {
    res.status(200).json({
      vercelEnv: process.env.VERCEL_ENV || null,
      hasKey: !!process.env.ANTHROPIC_API_KEY,
      keyLen: (process.env.ANTHROPIC_API_KEY || "").length,
      anthropicKeys: Object.keys(process.env).filter((k) => k.toUpperCase().includes("ANTHROPIC")),
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "Method not allowed" } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: { message: "Falta ANTHROPIC_API_KEY en el servidor. Configúrala en Vercel → Settings → Environment Variables." },
    });
    return;
  }

  try {
    const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body,
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({ error: { message: "Proxy error: " + (err && err.message ? err.message : String(err)) } });
  }
}
