import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Define types for our health check response
type GeminiTestResult = 
  | { status: 'not_tested' }
  | { status: 'success'; responseText: string }
  | { status: 'error'; errorMessage: string; errorCode: string };

export async function GET() {
  try {
    // Get the actual API key value to check its length
    const apiKey = process.env.GEMINI_API_KEY || '';
    let geminiTestResult: GeminiTestResult = { status: 'not_tested' };
    
    // Try to test the Gemini API directly
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = "Say 'API working' if you can read this";
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        geminiTestResult = { 
          status: 'success',
          responseText: text.substring(0, 50)
        };
      } catch (apiError: any) {
        geminiTestResult = { 
          status: 'error',
          errorMessage: apiError.message || 'Unknown API error',
          errorCode: apiError.code || 'UNKNOWN'
        };
      }
    }
    
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      geminiApiKey: apiKey ? {
        configured: true,
        valid: apiKey.startsWith('AIza') && apiKey.length > 30,
        length: apiKey.length
      } : 'missing',
      geminiTest: geminiTestResult,
      version: '1.0.0'
    }

    return NextResponse.json(status)
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error', 
        errorMessage: error.message || 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
