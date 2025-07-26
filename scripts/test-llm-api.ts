import dotenv from 'dotenv';
import { getFoodReaction } from '../lib/llmService';

// Load environment variables
dotenv.config();

// Log environment variables for debugging
console.log('Environment Variables:');
console.log(`- AZURE_OPENAI_API_KEY: ${process.env.AZURE_OPENAI_API_KEY ? '***' : 'Not set'}`);
console.log(`- AZURE_OPENAI_ENDPOINT: ${process.env.AZURE_OPENAI_ENDPOINT || 'Not set'}`);
console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

async function testLLMAPI() {
  try {
    console.log('\n--- Testing LLM API ---');
    const foodType = 'energy-drink';
    console.log(`\n1. Getting reaction for food type: ${foodType}`);
    
    console.log('2. Calling getFoodReaction...');
    const response = await getFoodReaction(foodType);
    
    console.log('\n3. API Response:', response);
    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('\n❌ Error testing LLM API:');
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

// Run the test
testLLMAPI();
