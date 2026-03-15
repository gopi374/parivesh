import { adminAuth } from './firebase-admin';
import { NextRequest } from 'next/server';

export async function verifyAuth(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  if (!sessionCookie) throw new Error('No session cookie');

  const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
  return decodedToken;
}

export async function createSessionCookie(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  return sessionCookie;
}
