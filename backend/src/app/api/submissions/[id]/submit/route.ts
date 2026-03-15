import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, notFound, serverError, forbidden, badRequest } from '@/lib/api-response';

export async function POST(
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

    await subRef.update({
      status: 'submitted',
      submittedAt: new Date(),
      updatedAt: new Date()
    });

    return ok({ id, status: 'submitted' }, 'Submission finalized');
  } catch (error) {
    return serverError(error);
  }
}
