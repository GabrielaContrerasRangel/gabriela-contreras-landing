function getCookie(req, name) {
  const header = req.headers['cookie'] ?? '';
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default async function handler(req, res) {

  // Guard: exige cookie válida antes de devolver datos
  const password = process.env.DASHBOARD_PASSWORD;
  const token = getCookie(req, 'crm_auth');
  if (!password || token !== password) {
    res.status(401).json({ error: 'No autorizado.' });
    return;
  }

  // Debug sin exponer la key
  if (req.query && req.query.debug === "1") {
    res.status(200).json({
      vercelEnv: process.env.VERCEL_ENV || null,
      hasUrl: !!process.env.SUPABASE_URL,
      hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });
    return;
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    res.status(500).json({
      status: "pending",
      error: "Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en Vercel.",
    });
    return;
  }

  try {
    const upstream = await fetch(`${url}/rest/v1/rpc/crm_metrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": key,
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify({}),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(502).json({
        status: "pending",
        error: `Supabase respondió ${upstream.status}: ${text}`,
      });
      return;
    }

    const data = await upstream.json();
    res.status(200).json({ status: "live", data });

  } catch (err) {
    res.status(502).json({
      status: "pending",
      error: "Error de red al llamar Supabase: " + (err?.message ?? String(err)),
    });
  }
}
