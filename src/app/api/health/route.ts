import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET() {
  try {
    // Get the actual API key value to check its length
    const apiKey = process.env.GEMINI_API_KEY || '';
    let geminiTestResult = { status: 'not_tested' };
    
    // Try to test the Gemini API directly
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const prompt = "Say 'API working' if you can read this";
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        geminiTestResult = { 
          status: 'success',
          response: text.substring(0, 50)
        };
      } catch (apiError: any) {
        geminiTestResult = { 
          status: 'error',
          error: apiError.message || 'Unknown API error',
          code: apiError.code || 'UNKNOWN'
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
        error: error.message || 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
