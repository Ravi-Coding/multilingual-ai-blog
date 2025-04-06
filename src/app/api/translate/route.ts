// route.ts (API for translation)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error('Missing Hugging Face API Key.');
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    const response = await fetch('https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-ROMANCE', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    const contentType = response.headers.get('content-type') || '';

    // If it's not JSON, it's probably an error HTML page
    if (!contentType.includes('application/json')) {
      const html = await response.text();
      console.error('❌ Hugging Face returned non-JSON content:', html.slice(0, 500)); // limit log size
      return NextResponse.json({ error: 'Hugging Face returned invalid response (non-JSON)' }, { status: 502 });
    }

    const result = await response.json();

    if (!Array.isArray(result) || !result[0]?.translation_text) {
      console.error('❌ Unexpected API response:', result);
      return NextResponse.json({ error: 'Translation failed due to unexpected response format' }, { status: 500 });
    }

    const translatedText = result[0].translation_text;
    return NextResponse.json({ translatedText });

  } catch (error) {
    console.error('⚠️ Translation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
