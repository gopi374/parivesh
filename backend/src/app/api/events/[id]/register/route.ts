import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, badRequest, serverError, notFound } from '@/lib/api-response';
import admin from '@/lib/firebase-admin';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const { id: eventId } = await params;
    const uid = decodedToken.uid;

    const eventRef = adminDb.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) return notFound('Event');
    
    const eventData = eventDoc.data();
    if (!eventData?.isOpen) return badRequest('Registration is closed for this event');
    if (eventData.currentParticipants >= eventData.maxParticipants) {
      return badRequest('Event is full');
    }
    if (new Date() > eventData.registrationDeadline.toDate()) {
      return badRequest('Registration deadline has passed');
    }

    // Check if already registered
    const existingReg = await adminDb.collection('registrations')
      .where('userId', '==', uid)
      .where('eventId', '==', eventId)
      .get();
    
    if (!existingReg.empty) return badRequest('You are already registered for this event');

    const body = await request.json();
    const registration = {
      userId: uid,
      eventId,
      teamName: body.teamName || '',
      teamMembers: body.teamMembers || [],
      status: 'pending',
      paymentStatus: 'unpaid',
      submittedAt: new Date(),
    };

    // Use transaction to update participants count and create registration
    await adminDb.runTransaction(async (transaction) => {
      transaction.set(adminDb.collection('registrations').doc(), registration);
      transaction.update(eventRef, {
        currentParticipants: admin.firestore.FieldValue.increment(1)
      });
      transaction.update(adminDb.collection('users').doc(uid), {
        registeredEvents: admin.firestore.FieldValue.arrayUnion(eventId)
      });
    });

    // Create notification
    await adminDb.collection('notifications').add({
      userId: uid,
      title: 'Registration Successful',
      message: `You have successfully registered for ${eventData.title}.`,
      type: 'success',
      read: false,
      createdAt: new Date(),
    });

    return ok({ registration }, 'Registered successfully');
  } catch (error) {
    return serverError(error);
  }
}
