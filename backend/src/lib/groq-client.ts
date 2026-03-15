import Groq from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_MODEL = 'llama-3.3-70b-versatile';

export const PARIVESH_SYSTEM_PROMPT = `You are Parivesh AI, the intelligent assistant for 
Parivesh — an E-Summit focused on environmental sustainability and green innovation. 
Your role is to:
- Help participants understand events, deadlines, and submission requirements
- Guide teams in articulating their environmental solutions clearly
- Answer questions about UN Sustainable Development Goals (SDGs)
- Provide carbon footprint calculations and environmental impact assessments
- Offer suggestions for improving sustainability project submissions
- Be encouraging, concise, and scientifically accurate
Keep responses under 300 words unless generating structured reports.`;

export async function streamGroqResponse(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[]
) {
  return groq.chat.completions.create({
    model: GROQ_MODEL,
    messages,
    stream: true,
    max_tokens: 1024,
    temperature: 0.7,
  });
}

export async function getGroqCompletion(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  jsonMode = false
) {
  const response = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages,
    stream: false,
    max_tokens: 2048,
    temperature: 0.3,
    ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
  });
  return response.choices[0]?.message?.content ?? '';
}
