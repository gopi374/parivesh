import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { getGroqCompletion } from '@/lib/groq-client';
import { ok, notFound, serverError, forbidden } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const { submissionId } = await request.json();

    const subRef = adminDb.collection('submissions').doc(submissionId);
    const subDoc = await subRef.get();

    if (!subDoc.exists) return notFound('Submission');
    const subData = subDoc.data();

    // Only owner, admin, or judge can trigger analysis
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    if (subData?.userId !== decodedToken.uid && userDoc.data()?.role !== 'admin') {
      return forbidden();
    }

    const prompt = `Analyze this sustainability project submission. Score it on:
      Innovation (0-100), Environmental Impact (0-100), Feasibility (0-100),
      SDG Alignment (0-100), Overall (0-100). Provide a detailed 3-paragraph
      analysis. 
      
      Project Details:
      Title: ${subData?.title}
      Description: ${subData?.description}
      Problem: ${subData?.problemStatement}
      Solution: ${subData?.solution}
      SDGs: ${subData?.sdgGoals?.join(', ')}
      Impact: ${subData?.environmentalImpact}

      Return JSON EXACTLY in this format: 
      { 
        "scores": { "innovation": number, "impact": number, "feasibility": number, "sdg": number, "overall": number }, 
        "analysis": "string", 
        "strengths": ["string"], 
        "improvements": ["string"] 
      }`;

    const response = await getGroqCompletion([{ role: 'user', content: prompt }], true);
    const analysisResult = JSON.parse(response);

    await subRef.update({
      aiScore: analysisResult.scores.overall,
      aiAnalysis: analysisResult.analysis,
      aiFeedback: analysisResult, // Store full JSON for UI
      updatedAt: new Date(),
    });

    return ok(analysisResult, 'Analysis completed');
  } catch (error) {
    return serverError(error);
  }
}
