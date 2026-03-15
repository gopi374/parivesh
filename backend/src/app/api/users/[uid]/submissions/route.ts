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

    if (decodedToken.uid !== uid) {
      const currentUserDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
      if (currentUserDoc.data()?.role !== 'admin' && currentUserDoc.data()?.role !== 'judge') {
        return forbidden();
      }
    }

    const submissionsSnapshot = await adminDb.collection('submissions')
      .where('userId', '==', uid)
      .orderBy('submittedAt', 'desc')
      .get();

    const submissions = submissionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ok(submissions);
  } catch (error) {
    return serverError(error);
  }
}
