import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { generateReport } from '@/lib/openai-client';
import { ok, serverError, forbidden } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const { reportType, data } = await request.json();
    const uid = decodedToken.uid;

    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.data();

    // Check if user is eligible for reports (e.g., student or admin)
    if (!userData) return forbidden();

    const prompt = `Generate a comprehensive ${reportType} report based on the following data:
      ${JSON.stringify(data)}
      
      The report should be professional, structured with clear headings, and provide actionable sustainability insights.
      Use detailed technical language where appropriate.`;

    const reportContent = await generateReport(prompt);

    const reportRef = await adminDb.collection('reports').add({
      userId: uid,
      type: reportType,
      title: `${reportType.replace('_', ' ').toUpperCase()} Report`,
      data,
      content: reportContent, // Store content for web view
      generatedAt: new Date(),
    });

    return ok({ reportId: reportRef.id, content: reportContent }, 'Report generated');
  } catch (error) {
    return serverError(error);
  }
}
