import { NextRequest } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { ok, badRequest, serverError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const { email, password, displayName, phoneNumber } = await request.json();

    if (!email || !password) {
      return badRequest('Email and password are required');
    }

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
      phoneNumber,
    });

    // Create user profile in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName,
      role: 'proponent', // Default role for new registrations
      createdAt: new Date(),
      updatedAt: new Date(),
      registeredEvents: [],
    });

    return ok({ uid: userRecord.uid }, 'User registered successfully');
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      return badRequest('Email already exists');
    }
    return serverError(error);
  }
}
