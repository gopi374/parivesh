import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import connectDB from '@/lib/mongoose';
import { ok, serverError } from '@/lib/api-response';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  const status: any = {
    timestamp: new Date().toISOString(),
    services: {
      firebase: 'unknown',
      mongodb: 'unknown',
    }
  };

  try {
    // Check Firebase
    await adminDb.collection('health').doc('ping').set({ timestamp: new Date() });
    status.services.firebase = 'connected';
  } catch (error: any) {
    status.services.firebase = `error: ${error.message}`;
  }

  try {
    // Check MongoDB
    await connectDB();
    status.services.mongodb = mongoose.connection.readyState === 1 ? 'connected' : 'connecting';
  } catch (error: any) {
    status.services.mongodb = `error: ${error.message}`;
  }

  const allConnected = status.services.firebase === 'connected' && status.services.mongodb === 'connected';

  if (!allConnected) {
    return serverError(status);
  }

  return ok(status, 'System is healthy');
}
