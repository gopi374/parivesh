import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { ok, serverError } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const leaderboardSnapshot = await adminDb.collection('leaderboard')
      .orderBy('updatedAt', 'desc')
      .get();

    const leaderboard = leaderboardSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ok(leaderboard);
  } catch (error) {
    return serverError(error);
  }
}
