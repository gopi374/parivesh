import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, unauthorized, notFound, serverError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();

    if (!userDoc.exists) return notFound('User');

    return ok(userDoc.data());
  } catch (error) {
    return unauthorized();
  }
}
