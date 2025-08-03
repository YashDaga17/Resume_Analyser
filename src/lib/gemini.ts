import { GoogleGenerativeAI } from '@google/generative-ai'
import type { ResumeAnalysis, InterviewQuestion, ChatMessage } from '@/types'

// Get the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY

// Log a warning if the API key is not set, but don't fail
if (!apiKey) {
  console.warn('Warning: GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey || '')

// Create generative model using the stable Gemini 2.0 model
// Changed back to the original model for compatibility
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export class GeminiService {
  
  // Helper to check if the API key is available, but use demo data instead of failing
  private static checkApiKey(): boolean {
    return !!apiKey;
  }

  static async analyzeResume(resumeText: string, fileName: string): Promise<ResumeAnalysis> {
    // Continue even if API key is missing - the error will be caught in the route handler
    // and will return demo data
    
    const prompt = `
      Act as an expert recruiter and career coach. Analyze this resume using multiple specialized approaches:

      1. SPOT THE FLAWS: Act as a critical recruiter reviewing this resume. Highlight weak areas, overused buzzwords, missing metrics, and be brutally honest about what needs improvement.

      2. REWRITE FOR IMPACT: Identify how to make this resume more results-driven, quantifiable, and compelling. Focus on achievements over duties.

      3. ATS OPTIMIZATION: Analyze ATS compatibility and suggest industry-specific keywords that should be naturally integrated.

      4. CRAFT THE HOOK: Evaluate the professional summary/objective and suggest improvements for maximum recruiter impact.

      5. EXPERIENCE ENHANCEMENT: Analyze how to rephrase experience sections with action verbs, quantifiable outcomes, and transferable skills.

      Resume Text:
      ${resumeText}

      Please analyze and return a JSON response with this enhanced structure:
      {
        "fileName": "${fileName}",
        "analysisId": "generated-id",
        "timestamp": "current-timestamp", 
        "overallScore": number (0-100),
        "sections": {
          "atsCompatibility": {
            "score": number (0-100),
            "issues": ["issue1", "issue2"],
            "improvements": ["improvement1", "improvement2"],
            "keywords": {
              "missing": ["keyword1", "keyword2"],
              "present": ["keyword3", "keyword4"], 
              "suggested": ["suggestion1", "suggestion2"]
            }
          },
          "skillsGaps": {
            "score": number (0-100),
            "technical": {
              "present": ["skill1", "skill2"],
              "missing": ["skill3", "skill4"],
              "trending": ["trend1", "trend2"]
            },
            "soft": {
              "present": ["soft1", "soft2"],
              "missing": ["soft3", "soft4"],
              "important": ["important1", "important2"]
            },
            "recommendations": ["rec1", "rec2"]
          },
          "experience": {
            "score": number (0-100),
            "level": "entry|junior|mid|senior",
            "strengths": ["strength1", "strength2"],
            "gaps": ["gap1", "gap2"],
            "suggestions": ["suggestion1", "suggestion2"],
            "projectIdeas": ["project1", "project2"]
          },
          "grammar": {
            "score": number (0-100),
            "errors": [
              {
                "type": "spelling|grammar|punctuation",
                "text": "error text",
                "suggestion": "correction"
              }
            ],
            "improvements": ["improvement1", "improvement2"]
          },
          "formatting": {
            "score": number (0-100),
            "issues": ["issue1", "issue2"],
            "positives": ["positive1", "positive2"],
            "suggestions": ["suggestion1", "suggestion2"]
          },
          "flawAnalysis": {
            "score": number (0-100),
            "buzzwords": {
              "overused": ["buzzword1", "buzzword2"],
              "suggestions": ["better1", "better2"]
            },
            "weakAreas": [
              {
                "area": "section name",
                "issue": "specific problem",
                "improvement": "how to fix it"
              }
            ],
            "missingMetrics": ["Add quantified achievements", "Include percentage improvements"],
            "structuralIssues": ["issue1", "issue2"],
            "honestFeedback": ["brutal but constructive feedback"]
          },
          "impactRewrite": {
            "score": number (0-100),
            "currentIssues": ["duty-focused language", "weak action verbs"],
            "rewriteSuggestions": [
              {
                "original": "original text",
                "improved": "improved version",
                "reasoning": "why this is better"
              }
            ],
            "actionVerbSuggestions": ["verb1", "verb2"],
            "quantificationTips": ["tip1", "tip2"],
            "achievementHighlights": ["highlight1", "highlight2"]
          },
          "professionalSummary": {
            "score": number (0-100),
            "currentSummary": "current summary text or 'Not found'",
            "hookStrength": number (0-100),
            "suggestedSummary": "powerful 3-line summary",
            "impactKeywords": ["keyword1", "keyword2"],
            "improvements": ["improvement1", "improvement2"],
            "personalBranding": ["brand1", "brand2"]
          }
        },
        "recommendations": [
          {
            "id": "rec-id",
            "category": "ats|skills|experience|grammar|formatting|flaws|impact|summary",
            "priority": "high|medium|low",
            "title": "recommendation title",
            "description": "detailed description",
            "actionable": "specific action to take",
            "timeEstimate": "estimated time"
          }
        ],
        "nextSteps": ["step1", "step2", "step3"],
        "careerRoadmap": {
          "currentLevel": "entry|junior|mid|senior",
          "targetRoles": ["role1", "role2"],
          "skillProgression": [
            {
              "role": "target role",
              "requiredSkills": ["skill1", "skill2"],
              "timeToAchieve": "6-12 months",
              "learningPath": ["step1", "step2"]
            }
          ],
          "industryTrends": ["trend1", "trend2"],
          "certificationRecommendations": ["cert1", "cert2"]
        },
        "skillsGapTable": [
          {
            "role": "Software Engineer",
            "industry": "Technology",
            "requiredSkills": [
              {
                "skill": "JavaScript",
                "importance": "Critical|Important|Nice to Have",
                "currentLevel": "None|Beginner|Intermediate|Advanced",
                "gap": "High|Medium|Low",
                "learningResources": ["resource1", "resource2"],
                "timeToLearn": "2-3 months"
              }
            ],
            "overallMatch": number (0-100)
          }
        ]
      }

      Focus on being encouraging and constructive, especially for students who may lack extensive experience. Provide specific, actionable advice.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Clean the response text and parse JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      const analysis = JSON.parse(cleanedText)
      
      // Add missing fields if not present
      analysis.analysisId = analysis.analysisId || `analysis-${Date.now()}`
      analysis.timestamp = new Date()
      
      return analysis as ResumeAnalysis
    } catch (error) {
      console.error('Error analyzing resume:', error)
      throw new Error('Failed to analyze resume. Please try again.')
    }
  }

  static async generateInterviewQuestions(
    industry: string, 
    role: string, 
    experience: string,
    count: number = 5
  ): Promise<InterviewQuestion[]> {
    // Continue without checking API key - errors will be caught by route handlers
    
    const prompt = `
      Generate ${count} interview questions for a ${experience} level ${role} position in the ${industry} industry.
      
      Return a JSON array with this structure:
      [
        {
          "id": "question-id",
          "question": "interview question",
          "category": "behavioral|technical|situational|company",
          "difficulty": "easy|medium|hard",
          "tips": ["tip1", "tip2", "tip3"],
          "sampleAnswer": "example answer (optional)"
        }
      ]
      
      Make sure questions are appropriate for the experience level and include a mix of behavioral and technical questions.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleanedText) as InterviewQuestion[]
    } catch (error) {
      console.error('Error generating interview questions:', error)
      throw new Error('Failed to generate interview questions. Please try again.')
    }
  }

  static async provideFeedback(
    question: string, 
    answer: string, 
    questionCategory: string
  ): Promise<string> {
    // Continue without checking API key - errors will be caught by route handlers
    
    const prompt = `
      Provide constructive feedback on this interview answer:
      
      Question: ${question}
      Category: ${questionCategory}
      Answer: ${answer}
      
      Please provide:
      1. What was good about the answer
      2. Areas for improvement
      3. Specific suggestions for a stronger response
      4. A rating out of 10
      
      Be encouraging and constructive, especially for students or junior professionals.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error providing feedback:', error)
      throw new Error('Failed to provide feedback. Please try again.')
    }
  }

  static async chatResponse(
    message: string, 
    context: ChatMessage[] = [],
    userInfo?: { industry?: string; experience?: string; goals?: string[] }
  ): Promise<string> {
    // Continue without checking API key - errors will be caught and handled properly
    
    const contextString = context.length > 0 
      ? `Previous conversation:\n${context.map(msg => `${msg.role}: ${msg.content}`).join('\n')}\n\n`
      : ''

    const userContext = userInfo 
      ? `User context - Industry: ${userInfo.industry || 'Not specified'}, Experience: ${userInfo.experience || 'Not specified'}, Goals: ${userInfo.goals?.join(', ') || 'Not specified'}\n\n`
      : ''

    const prompt = `
      You are CareerBoost, a helpful and encouraging AI career assistant for students and young professionals. 
      
      ${userContext}${contextString}User message: ${message}
      
      Respond in a warm, supportive, and professional manner. Provide practical advice and actionable steps when possible. 
      Keep responses concise but helpful and conversational (maximum 3-4 short paragraphs or 200 words). 
      Use simple, clean formatting without markdown symbols like *, **, or bullet points.
      
      Write in a friendly, encouraging tone like you're talking to a friend. Keep paragraphs short and easy to read.
      Avoid using markdown formatting, asterisks, or special characters in your response.
      
      If the user asks about resume writing, interview prep, job searching, or career guidance, 
      provide specific and encouraging advice in a natural, conversational way.
      
      If appropriate, suggest using specific features of the CareerBoost platform (resume analysis, interview prep, message templates, etc.).
      
      Remember to keep your response brief and to the point for a chat interface.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Clean up markdown formatting from the response
      let cleanedResponse = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
        .replace(/^\s*[\*\-\+]\s+/gm, '') // Remove bullet points
        .replace(/^#{1,6}\s+/gm, '')     // Remove headers
        .trim()
      
      // Limit response length to prevent overflow (approximately 300 words max)
      if (cleanedResponse.length > 1200) {
        cleanedResponse = cleanedResponse.substring(0, 1200) + '...'
      }
      
      return cleanedResponse
    } catch (error) {
      console.error('Error in chat response:', error)
      return "I'm sorry, I'm having trouble responding right now. Please try asking again!"
    }
  }

  static async generateMessageTemplate(
    type: 'recruiter' | 'followup' | 'networking' | 'interview' | 'feedback',
    context: string,
    customization?: { industry?: string; role?: string; company?: string }
  ): Promise<{ subject: string; body: string; variables: string[] }> {
    // Continue without checking API key - errors will be caught by route handlers
    
    const prompt = `
      Generate a professional ${type} message template for a student or young professional.
      
      Context: ${context}
      ${customization ? `Industry: ${customization.industry}, Role: ${customization.role}, Company: ${customization.company}` : ''}
      
      Return JSON with this structure:
      {
        "subject": "email subject line",
        "body": "email body with [VARIABLE_NAME] placeholders for customization",
        "variables": ["VARIABLE_NAME", "ANOTHER_VARIABLE"]
      }
      
      Make the tone professional but warm, appropriate for students reaching out in professional contexts.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleanedText)
    } catch (error) {
      console.error('Error generating message template:', error)
      throw new Error('Failed to generate message template. Please try again.')
    }
  }
}
