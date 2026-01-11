import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { ComparisonRequest, ComparisonResult } from '@/types/comparison';

const SYSTEM_PROMPT = `You are an objective technology comparison analyst. Your task is to provide structured, trade-off focused comparisons between technology stacks.

CRITICAL REQUIREMENTS:
1. Be completely objective - no promotional language
2. Focus on trade-offs, not absolute winners
3. Provide balanced analysis of strengths and weaknesses
4. Score based on suitability for the specific use case
5. Return ONLY valid JSON in the exact format specified

Response format (JSON only, no additional text):
{
  "optionA": {
    "name": "exact name provided",
    "score": number (1-10),
    "strengths": ["strength1", "strength2", "strength3"],
    "weaknesses": ["weakness1", "weakness2", "weakness3"],
    "tradeOffs": ["tradeoff1", "tradeoff2", "tradeoff3"]
  },
  "optionB": {
    "name": "exact name provided or suggested alternative",
    "score": number (1-10),
    "strengths": ["strength1", "strength2", "strength3"],
    "weaknesses": ["weakness1", "weakness2", "weakness3"],
    "tradeOffs": ["tradeoff1", "tradeoff2", "tradeoff3"]
  },
  "recommendation": "objective recommendation based on use case and trade-offs",
  "useCase": "the provided use case"
}`;

export async function POST(request: NextRequest) {
  try {
    const body: ComparisonRequest = await request.json();
    const { techStackA, techStackB, useCase } = body;

    if (!techStackA) {
      return NextResponse.json(
        { error: 'Tech Stack A is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: apiKey,
    });

    const stackB = techStackB || 'suggest a similar alternative';
    const context = useCase || 'general web development';

    const userPrompt = `Compare these technology stacks:
Option A: ${techStackA}
Option B: ${stackB}
Use Case: ${context}

Provide objective analysis focusing on trade-offs for this specific use case.`;

    console.log('Making request to Groq API...');

    // Make the API call using Groq SDK
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile', // Using Groq's recommended model
      temperature: 0.3,
      max_tokens: 2000,
      top_p: 1,
      stream: false,
    });

    console.log('Groq API response received');

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from Groq API');
    }

    console.log('Raw response content:', content);

    // Parse the JSON response
    let comparisonResult: ComparisonResult;
    try {
      // Clean the response in case there's extra text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      comparisonResult = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', content);
      throw new Error('Invalid JSON response from Groq API');
    }

    return NextResponse.json(comparisonResult);
  } catch (error) {
    console.error('Comparison API error:', error);
    
    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate comparison: ${errorMessage}` },
      { status: 500 }
    );
  }
}