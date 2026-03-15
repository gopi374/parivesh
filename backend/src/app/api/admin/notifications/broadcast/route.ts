import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, serverError, forbidden, badRequest } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.data()?.role !== 'admin') return forbidden();

    const { title, message, type, targetEventId, targetRole } = await request.json();

    let userQuery: any = adminDb.collection('users');
    if (targetRole) userQuery = userQuery.where('role', '==', targetRole);
    if (targetEventId) userQuery = userQuery.where('registeredEvents', 'array-contains', targetEventId);

    const usersSnapshot = await userQuery.get();
    
    const batch = adminDb.batch();
    usersSnapshot.docs.forEach((userDoc: any) => {
      const notifRef = adminDb.collection('notifications').doc();
      batch.set(notifRef, {
        userId: userDoc.id,
        title,
        message,
        type: type || 'info',
        read: false,
        createdAt: new Date(),
      });
    });

    await batch.commit();

    return ok({ count: usersSnapshot.size }, `Broadcast sent to ${usersSnapshot.size} users`);
  } catch (error) {
    return serverError(error);
  }
}
