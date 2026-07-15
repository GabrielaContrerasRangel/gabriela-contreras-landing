export const config = {
  matcher: ['/dashboard.html', '/api/login'],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const password = process.env.DASHBOARD_PASSWORD;

  // ── LOGIN POST ──────────────────────────────────────────────
  if (url.pathname === '/api/login') {
    if (request.method !== 'POST') {
      return Response.redirect(new URL('/login.html', request.url), 302);
    }

    const body = await request.text();
    const params = new URLSearchParams(body);
    const attempt = params.get('password') ?? '';

    if (!password || attempt !== password) {
      return Response.redirect(new URL('/login.html?error=1', request.url), 302);
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/dashboard.html',
        'Set-Cookie': `crm_auth=${encodeURIComponent(password)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`,
      },
    });
  }

  // ── GATE /dashboard.html ────────────────────────────────────
  const cookie = request.headers.get('cookie') ?? '';
  const match  = cookie.match(/crm_auth=([^;]+)/);
  const token  = match ? decodeURIComponent(match[1]) : '';

  if (!password || token !== password) {
    return Response.redirect(new URL('/login.html', request.url), 302);
  }

  // cookie válida → deja pasar
}
