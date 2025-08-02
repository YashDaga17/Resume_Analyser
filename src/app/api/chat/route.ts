import { NextRequest, NextResponse } from 'next/server'
import { GeminiService } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context, userInfo } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = await GeminiService.chatResponse(message, context, userInfo)
    
    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Chat response error:', error)
    
    // Handle specific rate limiting errors
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to get chat response. Please try again.' },
      { status: 500 }
    )
  }
}
