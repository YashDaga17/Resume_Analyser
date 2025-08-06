import { NextRequest, NextResponse } from 'next/server'
import { GeminiService } from '@/lib/gemini'

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

    // Check if this is placeholder/demo text
    if (resumeText.includes('Sample Resume Content') || 
        resumeText.includes('This is placeholder text') ||
        resumeText.includes('placeholder text. For full PDF text extraction')) {
      return NextResponse.json(
        { 
          error: 'Failed to extract text from your PDF. This could be because:\n• The PDF contains only images (scanned document)\n• The PDF is password protected\n• The file is corrupted\n\nPlease try:\n• Converting your PDF to a Word document (.docx)\n• Using a text-based PDF (not a scanned image)\n• Uploading a plain text file (.txt)',
          errorType: 'PDF_EXTRACTION_FAILED'
        },
        { status: 400 }
      )
    }

    console.log(`Analyzing resume: ${fileName}, content length: ${resumeText.length}`)

    const analysis = await GeminiService.analyzeResume(resumeText, fileName)
    
    return NextResponse.json(analysis)
  } catch (error: any) {
    console.error('Resume analysis error:', error)
    console.log('Error details:', {
      message: error?.message,
      status: error?.status,
      code: error?.code
    })
    
    // Handle specific API errors with clear messages
    if (error?.message?.includes('429') || 
        error?.message?.includes('quota') || 
        error?.message?.includes('rate') ||
        error?.status === 429) {
      
      return NextResponse.json({
        error: 'API rate limit exceeded. Please wait a few minutes and try again.',
        errorType: 'RATE_LIMIT',
        retryAfter: 300 // 5 minutes
      }, { status: 429 })
    }

    // Handle API key issues
    if (error?.message?.includes('API_KEY') || 
        error?.message?.includes('401') ||
        error?.message?.includes('forbidden')) {
      
      return NextResponse.json({
        error: 'API configuration issue. Please contact support.',
        errorType: 'API_KEY_ERROR'
      }, { status: 500 })
    }

    // Handle invalid content
    if (error?.message?.includes('SAFETY') || 
        error?.message?.includes('content')) {
      
      return NextResponse.json({
        error: 'Resume content cannot be analyzed. Please ensure your resume contains appropriate professional content.',
        errorType: 'CONTENT_ERROR'
      }, { status: 400 })
    }
    
    return NextResponse.json({
      error: 'Failed to analyze resume. Please check your resume content and try again.',
      errorType: 'ANALYSIS_ERROR',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
