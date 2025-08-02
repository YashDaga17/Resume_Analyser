import { NextRequest, NextResponse } from 'next/server'
import { GeminiService } from '@/lib/gemini'
import { demoAnalysis } from '@/lib/demo-data'

export async function POST(request: NextRequest) {
  let fileName = 'unknown-file'
  
  try {
    const body = await request.json()
    const { resumeText, fileName: userFileName } = body
    fileName = userFileName || 'unknown-file'

    if (!resumeText || !fileName) {
      return NextResponse.json(
        { error: 'Resume text and file name are required' },
        { status: 400 }
      )
    }

    const analysis = await GeminiService.analyzeResume(resumeText, fileName)
    
    return NextResponse.json(analysis)
  } catch (error: any) {
    console.error('Resume analysis error:', error)
    
    // Handle specific rate limiting errors with demo mode
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      console.log('Rate limit exceeded, returning demo analysis')
      
      // Return demo analysis with user's filename
      const demoWithUserFile = {
        ...demoAnalysis,
        fileName: fileName,
        analysisId: `demo-${Date.now()}`,
        timestamp: new Date()
      }
      
      return NextResponse.json({
        ...demoWithUserFile,
        isDemo: true,
        message: "You've hit the free tier rate limit. Here's a demo analysis to show you what our AI can do!"
      })
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    )
  }
}
