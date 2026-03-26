import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  
  if (!client_id || !redirect_uri) return new NextResponse('Missing env variables', { status: 500 });
  
  const scope = 'user-read-currently-playing';
  const state = Math.random().toString(36).substring(7);

  const auth_url = new URL('https://accounts.spotify.com/authorize');
  auth_url.searchParams.append('response_type', 'code');
  auth_url.searchParams.append('client_id', client_id);
  auth_url.searchParams.append('scope', scope);
  auth_url.searchParams.append('redirect_uri', redirect_uri);
  auth_url.searchParams.append('state', state);

  return NextResponse.redirect(auth_url.toString());
}
