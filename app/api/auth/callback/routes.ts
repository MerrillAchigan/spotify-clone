// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=missing_code', req.url));
  }

  var clientId = process.env.SPOTIFY_CLIENT_ID!;
  var clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  var redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

  console.log('Client ID:', clientId);
  console.log('Client Secret:', clientSecret);

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    // Request the access token using the authorization code
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.redirect(new URL(`/?error=${data.error}`, req.url));
    }

    // Here you can set the access token as a cookie for secure storage
    // You might want to use something like `cookies().set()` in production
    const redirectTo = new URL('/', req.url);
    redirectTo.searchParams.set('access_token', data.access_token); // For demo purposes, query params
    return NextResponse.redirect(redirectTo);
  } catch (error) {
    console.error('Error fetching access token:', error);
    return NextResponse.redirect(new URL('/?error=auth_error', req.url));
  }
}
