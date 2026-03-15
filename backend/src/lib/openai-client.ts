import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReport(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a sustainability expert generating detailed structured reports. Output clean, professional markdown.',
      },
      { role: 'user', content: prompt },
    ],
    max_tokens: 4096,
    temperature: 0.4,
  });
  return response.choices[0]?.message?.content ?? '';
}
