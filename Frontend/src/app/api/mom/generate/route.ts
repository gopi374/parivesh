import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize the Groq client
// Ensure GROQ_API_KEY is set in your .env.local file
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { input, context } = await req.json();

        if (!input) {
            return NextResponse.json({ error: 'Input is required' }, { status: 400 });
        }

        const systemPrompt = `You are an expert AI assistant tasked with writing highly professional, accurate, and formal 'Minutes of Meeting' (MoM) for the Ministry of Environment, Forest and Climate Change.
You will be provided with rough notes, transcripts, or specific instructions from the user. 
You may also be provided with the current context/draft of the MoM.
Your task is to generate the appropriate HTML content to represent the requested addition or modification to the MoM.
Always start with an appropriate header or separator if adding a new section.
Use semantic HTML tags like <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, etc.
Do not wrap your response in markdown code blocks like \`\`\`html. Return ONLY the raw HTML string.
The output should look highly professional, suitable for a government document.`;

        const userPrompt = `Current Draft Context (if any):\n${context}\n\nUser Request/Input:\n${input}\n\nPlease generate the corresponding HTML addition or modification.`;

        const response = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant', // Fast and capable open-source model
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7, // A bit of creativity but mostly focused and formal
        });

        const generatedHtml = response.choices[0].message.content || '';
        
        // Sometimes the model might still try to add markdown backticks despite instructions, clean them if present
        const cleanedHtml = generatedHtml.replace(/^```html\s*/m, '').replace(/```\s*$/m, '').trim();

        return NextResponse.json({ result: cleanedHtml });
    } catch (error: unknown) {
        console.error('Groq Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to generate MoM';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
