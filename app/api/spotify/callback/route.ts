import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new NextResponse('No code provided', { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  if (!client_id || !client_secret || !redirect_uri) {
    return new NextResponse('Missing env variables', { status: 500 });
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    }),
  });

  const data = await response.json();
  if (data.error) {
    return NextResponse.json(data);
  }

  return new NextResponse(
    `SUCCESS! Now copy this Refresh Token exactly and paste it into your .env.local file as SPOTIFY_REFRESH_TOKEN:\n\n${data.refresh_token}`,
    { status: 200, headers: { 'Content-Type': 'text/plain' }}
  );
}
