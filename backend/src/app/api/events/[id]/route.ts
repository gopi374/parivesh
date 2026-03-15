import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { ok, notFound, serverError, forbidden, badRequest } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const eventDoc = await adminDb.collection('events').doc(id).get();

    if (!eventDoc.exists) return notFound('Event');

    return ok({ id: eventDoc.id, ...eventDoc.data() });
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.data()?.role !== 'admin') return forbidden();

    const { id } = await params;
    const body = await request.json();
    const updates = { ...body, updatedAt: new Date() };
    
    if (body.date) updates.date = new Date(body.date);
    if (body.registrationDeadline) updates.registrationDeadline = new Date(body.registrationDeadline);

    await adminDb.collection('events').doc(id).update(updates);
    const updatedDoc = await adminDb.collection('events').doc(id).get();

    return ok({ id, ...updatedDoc.data() }, 'Event updated successfully');
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAuth(request);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (userDoc.data()?.role !== 'admin') return forbidden();

    const { id } = await params;
    await adminDb.collection('events').doc(id).delete();

    return ok({ id }, 'Event deleted successfully');
  } catch (error) {
    return serverError(error);
  }
}
