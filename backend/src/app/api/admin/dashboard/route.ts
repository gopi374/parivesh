import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, serverError, forbidden } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.data()?.role !== 'admin') return forbidden();

    const [users, events, regs, subs] = await Promise.all([
      adminDb.collection('users').count().get(),
      adminDb.collection('events').count().get(),
      adminDb.collection('registrations').count().get(),
      adminDb.collection('submissions').count().get(),
    ]);

    // Group submissions by status
    const subsSnapshot = await adminDb.collection('submissions').get();
    const submissionsByStatus: Record<string, number> = {};
    subsSnapshot.docs.forEach(doc => {
      const status = doc.data().status;
      submissionsByStatus[status] = (submissionsByStatus[status] || 0) + 1;
    });

    return ok({
      totalUsers: users.data().count,
      totalEvents: events.data().count,
      totalRegistrations: regs.data().count,
      totalSubmissions: subs.data().count,
      submissionsByStatus,
    });
  } catch (error) {
    return serverError(error);
  }
}
