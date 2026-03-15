import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, unauthorized, serverError, forbidden, notFound } from '@/lib/api-response';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { uid: string; notifId: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { uid, notifId } = await params;

    if (decodedToken.uid !== uid) return forbidden();

    const notifRef = adminDb.collection('notifications').doc(notifId);
    const notifDoc = await notifRef.get();

    if (!notifDoc.exists) return notFound('Notification');
    if (notifDoc.data()?.userId !== uid) return forbidden();

    await notifRef.update({ read: true });

    return ok({ id: notifId, read: true }, 'Notification marked as read');
  } catch (error) {
    return serverError(error);
  }
}
