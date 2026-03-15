import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, serverError, forbidden } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.data()?.role !== 'admin' && userDoc.data()?.role !== 'judge') {
      return forbidden();
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const eventId = searchParams.get('eventId');

    let query: any = adminDb.collection('submissions');
    if (status) query = query.where('status', '==', status);
    if (eventId) query = query.where('eventId', '==', eventId);

    const snapshot = await query.orderBy('submittedAt', 'desc').get();
    const submissions = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ok(submissions);
  } catch (error) {
    return serverError(error);
  }
}
