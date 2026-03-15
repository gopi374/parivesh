import { NextRequest } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, notFound, serverError } from '@/lib/api-response';
import { jsPDF } from 'jspdf';

export async function POST(
  request: NextRequest
) {
  try {
    await verifyAuth(request);
    const { registrationId } = await request.json();

    const regDoc = await adminDb.collection('registrations').doc(registrationId).get();
    if (!regDoc.exists) return notFound('Registration');
    const regData = regDoc.data();

    const [userDoc, eventDoc] = await Promise.all([
      adminDb.collection('users').doc(regData?.userId).get(),
      adminDb.collection('events').doc(regData?.eventId).get(),
    ]);

    const userData = userDoc.data();
    const eventData = eventDoc.data();

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text('PARIVESH 3.0', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Registration Confirmation', 105, 30, { align: 'center' });

    // Content
    doc.setFontSize(12);
    doc.text(`Registration ID: ${registrationId}`, 20, 50);
    doc.text(`Participant: ${userData?.displayName || 'N/A'}`, 20, 60);
    doc.text(`College: ${userData?.college || 'N/A'}`, 20, 70);
    doc.text(`Event: ${eventData?.title || 'N/A'}`, 20, 80);
    doc.text(`Date: ${eventData?.date.toDate().toLocaleDateString() || 'N/A'}`, 20, 90);
    doc.text(`Venue: ${eventData?.venue || 'N/A'}`, 20, 100);

    doc.text('Terms and Conditions:', 20, 120);
    doc.setFontSize(10);
    doc.text('1. Please carry a digital or printed copy of this PDF.', 20, 130);
    doc.text('2. Arrive at least 15 minutes before the start time.', 20, 140);

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    const fileName = `pdfs/registrations/${registrationId}.pdf`;
    const fileRef = adminStorage.bucket().file(fileName);

    await fileRef.save(pdfBuffer, {
      metadata: { contentType: 'application/pdf' },
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileName}`;
    
    return ok({ pdfURL: publicUrl });
  } catch (error) {
    return serverError(error);
  }
}
