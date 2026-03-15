import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { ok, serverError, notFound } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params;
    
    // Fetch top 50 submissions for this event
    const submissionsSnapshot = await adminDb.collection('submissions')
      .where('eventId', '==', eventId)
      .where('status', '==', 'judged')
      .orderBy('finalScore', 'desc')
      .limit(50)
      .get();

    const rankings = await Promise.all(submissionsSnapshot.docs.map(async (doc: any, index: number) => {
      const data = doc.data();
      const userDoc = await adminDb.collection('users').doc(data.userId).get();
      const userData = userDoc.data();
      
      return {
        rank: index + 1,
        userId: data.userId,
        displayName: userData?.displayName,
        submissionId: doc.id,
        finalScore: data.finalScore,
        college: userData?.college,
      };
    }));

    return ok({ rankings });
  } catch (error) {
    return serverError(error);
  }
}
