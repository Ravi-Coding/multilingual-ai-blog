

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Write a detailed, well-structured blog on "${prompt}". The blog should have an introduction, key sections, and a conclusion.`,
        parameters: { max_new_tokens: 500 },
      }),
    });

    const result = await response.json();
    const originalContent = result?.[0]?.generated_text || '';

    // Fallback if Hugging Face returns nothing
    if (!originalContent) {
      return NextResponse.json({ original: '', translated: '' });
    }

    return NextResponse.json({
      original: originalContent,
      translated: '', // empty since translation is not used
    });

  } catch (error) {
    console.error('Error in /api/generate:', error);
    return NextResponse.json({ error: 'Failed to generate blog.' }, { status: 500 });
  }
}
