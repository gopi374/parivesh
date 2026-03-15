import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAuth } from '@/lib/auth-helpers';
import { streamGroqResponse, PARIVESH_SYSTEM_PROMPT } from '@/lib/groq-client';
import { serverError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAuth(request);
    const { message, sessionId, context } = await request.json();
    const uid = decodedToken.uid;

    // Load conversation history
    const convRef = adminDb.collection('ai_conversations').doc(sessionId || 'general');
    const convDoc = await convRef.get();
    let messages = convDoc.exists ? convDoc.data()?.messages || [] : [];

    // Append user message
    const userMessage = { role: 'user', content: message, timestamp: new Date() };
    messages.push(userMessage);

    // Filter for context and keep last 10 for performance
    const history = messages.slice(-10).map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    const fullMessages = [
      { role: 'system', content: PARIVESH_SYSTEM_PROMPT },
      ...history
    ];

    const stream = await streamGroqResponse(fullMessages as any);

    // Create a TransformStream to handle the SSE format
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let assistantContent = '';
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          assistantContent += content;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
        }

        // Save conversation after stream ends
        const assistantMessage = { role: 'assistant', content: assistantContent, timestamp: new Date() };
        messages.push(assistantMessage);
        
        await convRef.set({
          userId: uid,
          messages,
          context: context || 'general',
          updatedAt: new Date(),
        }, { merge: true });

        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return serverError(error);
  }
}
