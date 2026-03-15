import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth-helpers';
import { getGroqCompletion } from '@/lib/groq-client';
import { ok, serverError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    await verifyAuth(request);
    const { activity, quantity, unit, details } = await request.json();

    const prompt = `Calculate the carbon footprint (CO2 equivalent in kg) for the following activity:
      Activity: ${activity}
      Quantity: ${quantity} ${unit}
      Details: ${details || 'None'}

      Provide the calculation breakdown and suggested ways to reduce this footprint.
      Return JSON: { "co2Kg": number, "breakdown": "string", "suggestions": ["string"] }`;

    const response = await getGroqCompletion([{ role: 'user', content: prompt }], true);
    const result = JSON.parse(response);

    return ok(result);
  } catch (error) {
    return serverError(error);
  }
}
