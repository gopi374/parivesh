import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, serverError, forbidden, notFound } from '@/lib/api-response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const adminDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (adminDoc.data()?.role !== 'admin') return forbidden();

    const { uid } = await params;
    const { role } = await request.json();

    if (!['student', 'admin', 'judge'].includes(role)) {
      return serverError('Invalid role');
    }

    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return notFound('User');

    await userRef.update({ role, updatedAt: new Date() });

    return ok({ uid, role }, 'User role updated successfully');
  } catch (error) {
    return serverError(error);
  }
}
