import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, unauthorized, notFound, serverError, forbidden } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { uid } = await params;

    // Check if user is requesting own profile or is admin
    const currentUserDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    const currentUser = currentUserDoc.data();

    if (decodedToken.uid !== uid && currentUser?.role !== 'admin') {
      return forbidden();
    }

    const userDoc = await adminDb.collection('users').doc(uid).get();
    if (!userDoc.exists) return notFound('User');

    return ok(userDoc.data());
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { uid } = await params;

    if (decodedToken.uid !== uid) return forbidden();

    const body = await request.json();
    const allowedUpdates = ['displayName', 'college', 'department', 'phone', 'bio', 'photoURL'];
    const updates: any = {};

    allowedUpdates.forEach(key => {
      if (body[key] !== undefined) updates[key] = body[key];
    });

    updates.updatedAt = new Date();

    await adminDb.collection('users').doc(uid).update(updates);
    const updatedDoc = await adminDb.collection('users').doc(uid).get();

    return ok(updatedDoc.data(), 'Profile updated successfully');
  } catch (error) {
    return serverError(error);
  }
}
