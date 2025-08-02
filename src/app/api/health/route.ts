import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      geminiApiKey: process.env.GEMINI_API_KEY ? 'configured' : 'missing',
      version: '1.0.0'
    }

    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
