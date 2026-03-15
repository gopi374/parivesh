import { NextRequest } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, notFound, serverError } from '@/lib/api-response';
import { jsPDF } from 'jspdf';

export async function POST(
  request: NextRequest
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { submissionId } = await request.json();

    const subDoc = await adminDb.collection('submissions').doc(submissionId).get();
    if (!subDoc.exists) return notFound('Submission');
    const subData = subDoc.data();

    const userDoc = await adminDb.collection('users').doc(subData?.userId).get();
    const userData = userDoc.data();

    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text('Submission Analysis Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Project: ${subData?.title}`, 20, 40);
    doc.text(`Team: ${userData?.displayName}`, 20, 50);
    
    doc.setFontSize(12);
    doc.text('Problem Statement:', 20, 70);
    doc.setFontSize(10);
    const problemLines = doc.splitTextToSize(subData?.problemStatement || '', 170);
    doc.text(problemLines, 20, 80);
    
    doc.setFontSize(12);
    const nextY = 80 + (problemLines.length * 5) + 10;
    doc.text('AI Analysis:', 20, nextY);
    doc.setFontSize(10);
    const analysisLines = doc.splitTextToSize(subData?.aiAnalysis || '', 170);
    doc.text(analysisLines, 20, nextY + 10);

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    const fileName = `pdfs/submissions/${submissionId}.pdf`;
    const fileRef = adminStorage.bucket().file(fileName);

    await fileRef.save(pdfBuffer, {
      metadata: { contentType: 'application/pdf' },
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileName}`;
    
    await adminDb.collection('submissions').doc(submissionId).update({
      reportURL: publicUrl
    });

    return ok({ pdfURL: publicUrl });
  } catch (error) {
    return serverError(error);
  }
}
