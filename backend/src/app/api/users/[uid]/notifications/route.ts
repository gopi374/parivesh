import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, unauthorized, serverError, forbidden } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { uid } = await params;

    if (decodedToken.uid !== uid) return forbidden();

    const notificationsSnapshot = await adminDb.collection('notifications')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const notifications = notificationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ok(notifications);
  } catch (error) {
    return serverError(error);
  }
}
