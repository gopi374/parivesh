import { NextResponse } from 'next/server';
import { ok } from '@/lib/api-response';

export async function POST() {
  const response = ok({}, 'Logout successful');
  response.cookies.set('session', '', { maxAge: 0 });
  return response;
}
