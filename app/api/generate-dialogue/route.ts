import { NextResponse } from 'next/server';
// import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

// const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
// const azureApiKey = process.env.AZURE_OPENAI_KEY;
// const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

// if (!endpoint || !azureApiKey || !deploymentName) {
//   throw new Error('Azure OpenAI environment variables not set');
// }

// const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Simulate a delay and a witty response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const wittyDialogue = `(Mocked) Azure OpenAI says: "${prompt}" sounds... adventurous. My circuits are buzzing with concern for your digestive tract. Proceed with caution, human.`;

    return NextResponse.json({ dialogue: wittyDialogue });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('API error:', errorMessage);
    return NextResponse.json({ error: 'Failed to generate dialogue', details: errorMessage }, { status: 500 });
  }
}
