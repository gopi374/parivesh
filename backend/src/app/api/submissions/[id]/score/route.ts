import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, notFound, serverError, forbidden } from '@/lib/api-response';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (userData?.role !== 'admin' && userData?.role !== 'judge') {
      return forbidden();
    }

    const { id } = await params;
    const { innovation, feasibility, impact, presentation, sustainability, comment } = await request.json();

    const score = {
      judgeId: decodedToken.uid,
      innovation,
      feasibility,
      impact,
      presentation,
      sustainability,
      comment,
      scoredAt: new Date(),
    };

    const subRef = adminDb.collection('submissions').doc(id);
    const subDoc = await subRef.get();
    
    if (!subDoc.exists) return notFound('Submission');

    const subData = subDoc.data();
    const existingScores = subData?.judgeScores || [];
    const updatedScores = [...existingScores, score];

    // Calculate final score (average of all criteria for all judges)
    const totalInnovation = updatedScores.reduce((acc, s) => acc + s.innovation, 0);
    const totalFeasibility = updatedScores.reduce((acc, s) => acc + s.feasibility, 0);
    const totalImpact = updatedScores.reduce((acc, s) => acc + s.impact, 0);
    const totalPresentation = updatedScores.reduce((acc, s) => acc + s.presentation, 0);
    const totalSustainability = updatedScores.reduce((acc, s) => acc + s.sustainability, 0);
    
    const count = updatedScores.length * 5; // 5 criteria
    const finalScore = (totalInnovation + totalFeasibility + totalImpact + totalPresentation + totalSustainability) / count;

    await subRef.update({
      judgeScores: updatedScores,
      finalScore,
      status: 'judged',
      updatedAt: new Date()
    });

    return ok({ finalScore }, 'Score added successfully');
  } catch (error) {
    return serverError(error);
  }
}
