import { NextRequest } from 'next/server';
import { adminStorage, adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, badRequest, serverError, unauthorized } from '@/lib/api-response';
import admin from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const eventId = formData.get('eventId') as string;
    const submissionId = formData.get('submissionId') as string;
    const type = formData.get('type') as string;

    if (!file) return badRequest('No file provided');
    if (file.size > 50 * 1024 * 1024) return badRequest('File size exceeds 50MB');

    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'video/mp4'
    ];

    if (!allowedTypes.includes(file.type)) {
      return badRequest('File type not allowed');
    }

    const uid = decodedToken.uid;
    const timestamp = Date.now();
    const fileName = `${uid}/${eventId || 'general'}/${timestamp}_${file.name}`;
    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    if (submissionId) {
      await adminDb.collection('submissions').doc(submissionId).update({
        fileURLs: admin.firestore.FieldValue.arrayUnion(publicUrl)
      });
    }

    return ok({ url: publicUrl, fileName: file.name, size: file.size });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await verifyAuth(request);
    const { fileURL } = await request.json();
    
    // Parse filename from URL
    const bucketName = adminStorage.bucket().name;
    const fileName = fileURL.split(`${bucketName}/`)[1];
    
    if (!fileName) return badRequest('Invalid file URL');

    await adminStorage.bucket().file(fileName).delete();
    return ok({}, 'File deleted successfully');
  } catch (error) {
    return serverError(error);
  }
}
