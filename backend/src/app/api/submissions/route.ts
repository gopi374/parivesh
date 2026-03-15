import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, forbidden, serverError, badRequest } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();

    let query: any = adminDb.collection('submissions');

    if (userData?.role !== 'admin' && userData?.role !== 'judge') {
      query = query.where('userId', '==', decodedToken.uid);
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const status = searchParams.get('status');

    if (eventId) query = query.where('eventId', '==', eventId);
    if (status) query = query.where('status', '==', status);

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

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const body = await request.json();
    const { eventId, registrationId } = body;

    // Verify registration
    const regDoc = await adminDb.collection('registrations').doc(registrationId).get();
    if (!regDoc.exists || regDoc.data()?.userId !== decodedToken.uid) {
      return forbidden();
    }

    const newSubmission = {
      ...body,
      userId: decodedToken.uid,
      status: 'draft',
      fileURLs: body.fileURLs || [],
      submittedAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await adminDb.collection('submissions').add(newSubmission);

    // Trigger AI analaysis asynchronously (or in the same call for simplicity here)
    // In a real app, this might be a background job.
    return ok({ id: docRef.id, ...newSubmission }, 'Submission draft created');
  } catch (error) {
    return serverError(error);
  }
}
