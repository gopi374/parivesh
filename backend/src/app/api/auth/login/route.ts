import { NextRequest } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { createSessionCookie } from '@/lib/auth-helpers';
import { ok, badRequest, unauthorized, serverError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (!idToken) return badRequest('ID token is required');

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Create session cookie
    const sessionCookie = await createSessionCookie(idToken);

    // Fetch or create user in Firestore
    const userDoc = await adminDb.collection('users').doc(uid).get();
    let userData = userDoc.data();

    if (!userDoc.exists) {
      userData = {
        uid,
        email: decodedToken.email,
        displayName: decodedToken.name || '',
        photoURL: decodedToken.picture || '',
        role: 'student',
        registeredEvents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await adminDb.collection('users').doc(uid).set(userData);
    }

    const response = ok({ user: userData }, 'Login successful');
    
    // Set HttpOnly cookie
    response.cookies.set('session', sessionCookie, {
      maxAge: 60 * 60 * 24 * 5, // 5 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return response;
  } catch (error) {
    return serverError(error);
  }
}
