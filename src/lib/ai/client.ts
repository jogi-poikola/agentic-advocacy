import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude API client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiting and cost tracking
let requestCount = 0;
let totalCost = 0;

export const rateLimiter = {
  getRequestCount: () => requestCount,
  getTotalCost: () => totalCost,
  reset: () => {
    requestCount = 0;
    totalCost = 0;
  }
};

// Retry logic for API calls
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }

  throw lastError!;
}

// Basic Claude API call with error handling
export async function callClaude(
  prompt: string,
  systemPrompt?: string,
  maxTokens: number = 2000
): Promise<string> {
  try {
    requestCount++;

    const response = await withRetry(async () => {
      return await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });
    });

    // Estimate cost (rough calculation for Haiku)
    const inputTokens = prompt.length / 4; // Rough token estimation
    const outputTokens = response.usage.output_tokens;
    const estimatedCost = (inputTokens * 0.00025 + outputTokens * 0.00125) / 1000;
    totalCost += estimatedCost;

    if (response.content[0].type === 'text') {
      return response.content[0].text;
    }

    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error(`Claude API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}