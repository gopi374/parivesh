const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateMoM = async (req, res) => {
  try {
    const { input, context } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    const systemPrompt = `You are an expert AI assistant tasked with writing highly professional, accurate, and formal 'Minutes of Meeting' (MoM) for the Ministry of Environment, Forest and Climate Change.
    Return ONLY raw HTML string. Use semantic tags like <h1>, <h2>, <p>, <ul>, <li>. No markdown blocks.`;

    const userPrompt = `Context:\n${context}\n\nRequest:\n${input}\n\nGenerate professional HTML:`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    });

    const generatedHtml = response.choices[0].message.content || '';
    const cleanedHtml = generatedHtml.replace(/^```html\s*/m, '').replace(/```\s*$/m, '').trim();

    res.json({ result: cleanedHtml });
  } catch (error) {
    console.error('Groq Error:', error);
    res.status(500).json({ error: 'Failed to generate MoM', message: error.message });
  }
};

module.exports = { generateMoM };
