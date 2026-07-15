export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    res.status(500).json({ error: 'DASHBOARD_PASSWORD no configurada en Vercel.' });
    return;
  }

  const attempt = (typeof req.body === 'object' ? req.body?.password : null)
    ?? new URLSearchParams(typeof req.body === 'string' ? req.body : '').get('password')
    ?? '';

  if (attempt !== password) {
    res.redirect(302, '/login.html?error=1');
    return;
  }

  res.setHeader(
    'Set-Cookie',
    `crm_auth=${encodeURIComponent(password)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
  );
  res.redirect(302, '/dashboard.html');
}
