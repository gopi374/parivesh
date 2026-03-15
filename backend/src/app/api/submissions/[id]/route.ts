import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, notFound, serverError, forbidden, badRequest } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const decodedToken = await verifyAuth(request);
    
    const submissionDoc = await adminDb.collection('submissions').doc(id).get();
    if (!submissionDoc.exists) return notFound('Submission');

    const subData = submissionDoc.data();
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (subData?.userId !== decodedToken.uid && userData?.role !== 'admin' && userData?.role !== 'judge') {
      return forbidden();
    }

    return ok({ id: submissionDoc.id, ...subData });
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { id } = await params;
    
    const subRef = adminDb.collection('submissions').doc(id);
    const subDoc = await subRef.get();
    
    if (!subDoc.exists) return notFound('Submission');
    if (subDoc.data()?.userId !== decodedToken.uid) return forbidden();
    if (subDoc.data()?.status !== 'draft') {
      return badRequest('Only draft submissions can be updated');
    }

    const body = await request.json();
    const updates = { ...body, updatedAt: new Date() };
    delete updates.status; // status can only be updated via /submit route

    await subRef.update(updates);
    const updated = await subRef.get();

    return ok(updated.data(), 'Submission updated');
  } catch (error) {
    return serverError(error);
  }
}
