import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, badRequest, serverError, forbidden } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isOpen = searchParams.get('isOpen');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query: any = adminDb.collection('events');

    if (category) query = query.where('category', '==', category);
    if (isOpen) query = query.where('isOpen', '==', isOpen === 'true');

    const totalSnapshot = await query.count().get();
    const total = totalSnapshot.data().count;

    const eventsSnapshot = await query
      .orderBy('date', 'asc')
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    const events = eventsSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ok({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.data()?.role !== 'admin') {
      return forbidden();
    }

    const body = await request.json();
    const newEvent = {
      ...body,
      currentParticipants: 0,
      organizer: decodedToken.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date(body.date),
      registrationDeadline: new Date(body.registrationDeadline),
    };

    const docRef = await adminDb.collection('events').add(newEvent);
    return ok({ id: docRef.id, ...newEvent }, 'Event created successfully');
  } catch (error) {
    return serverError(error);
  }
}
