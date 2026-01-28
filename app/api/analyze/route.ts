import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_OPENROUTER_BASE_URL,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { jobDetails, skills } = await req.json();

  if (!(jobDetails && skills)) {
    return new Response(
      JSON.stringify({ error: 'Missing job details or skills' }),
      { status: 400 }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [
        {
          role: 'system',
          content:
            'You are a career advisor. Analyze if the candidate is qualified for the job based on the provided job details and their skills. Structure your response in markdown with: ## Overall Qualification (yes/no/maybe with explanation), ## Strong Points (bullet list), ## Weak Points (bullet list), ## Recommendations (bullet list).',
        },
        {
          role: 'user',
          content: `Job details: ${jobDetails}\n\nCandidate skills: ${skills}`,
        },
      ],
      temperature: 0.7,
    });

    const analysis =
      completion.choices[0]?.message?.content || 'No analysis generated';

    return Response.json({ analysis });
  } catch (error: any) {
    // This will print the actual OpenRouter error in your terminal
    console.error('AI API ERROR:', error.response?.data || error.message || error);

    return new Response(
      JSON.stringify({
        error: 'Failed to generate analysis',
        details: error.message // Temporarily send this to the frontend to see it
      }),
      { status: 500 }
    );
  }
}