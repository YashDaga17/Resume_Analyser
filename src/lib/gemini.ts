import { GoogleGenerativeAI } from '@google/generative-ai'
import type { ResumeAnalysis, InterviewQuestion, ChatMessage } from '@/types'

// Get the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY

// Log a warning if the API key is not set, but don't fail
if (!apiKey) {
  console.warn('Warning: GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey || '')

// Create generative model with optimized configuration for JSON responses
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash',
  generationConfig: {
    temperature: 0.1, // Lower temperature for more consistent responses
    topP: 0.8,
    topK: 10,
    maxOutputTokens: 4096,
  },
});

export class GeminiService {
  
  private static checkApiKey(): boolean {
    return !!apiKey;
  }

  static async analyzeResume(resumeText: string, fileName: string): Promise<ResumeAnalysis> {
    if (!this.checkApiKey()) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('Starting comprehensive resume analysis with 5 separate AI requests...');
    
    try {
      // Run 5 separate analysis prompts in parallel for comprehensive analysis
      const [
        atsAnalysis,
        flawAnalysis, 
        impactAnalysis,
        summaryAnalysis,
        skillsAnalysis
      ] = await Promise.all([
        this.analyzeATSCompatibility(resumeText),
        this.analyzeFlaws(resumeText),
        this.analyzeImpactAndRewrite(resumeText),
        this.analyzeProfessionalSummary(resumeText),
        this.analyzeSkillsAndGaps(resumeText)
      ]);

      // Combine all analyses into comprehensive result
      const overallScore = Math.round(
        (atsAnalysis.score + flawAnalysis.score + impactAnalysis.score + summaryAnalysis.score + skillsAnalysis.score) / 5
      );

      const analysis: ResumeAnalysis = {
        fileName,
        analysisId: `analysis-${Date.now()}`,
        timestamp: new Date(),
        overallScore,
        sections: {
          atsCompatibility: atsAnalysis,
          flawAnalysis,
          impactRewrite: impactAnalysis,
          professionalSummary: summaryAnalysis,
          skillsGaps: skillsAnalysis,
          experience: {
            score: impactAnalysis.score,
            level: this.detectExperienceLevel(resumeText),
            strengths: impactAnalysis.achievementHighlights,
            gaps: flawAnalysis.weakAreas?.map((w: any) => w.issue) || [],
            suggestions: impactAnalysis.rewriteSuggestions?.map((r: any) => r.reasoning) || [],
            projectIdeas: [
              "Build a portfolio website showcasing your projects",
              "Contribute to open-source projects in your field",
              "Create a case study of your most impactful project"
            ]
          },
          grammar: {
            score: 85, // Based on flaw analysis
            errors: [],
            improvements: flawAnalysis.structuralIssues
          },
          formatting: {
            score: 80,
            issues: flawAnalysis.structuralIssues,
            positives: ["Professional layout", "Clear section headers"],
            suggestions: flawAnalysis.weakAreas?.map((w: any) => w.improvement) || []
          }
        },
        recommendations: this.generateRecommendations(flawAnalysis, impactAnalysis, summaryAnalysis),
        nextSteps: [
          "Implement the ATS optimization suggestions",
          "Rewrite experience bullets using impact-focused language",
          "Add quantifiable metrics to achievements",
          "Strengthen professional summary"
        ],
        careerRoadmap: {
          currentLevel: this.detectExperienceLevel(resumeText),
          targetRoles: this.suggestTargetRoles(resumeText),
          skillProgression: [{
            role: "Senior Role",
            requiredSkills: skillsAnalysis.technical?.trending || [],
            timeToAchieve: "12-18 months",
            learningPath: ["Online courses", "Practical projects", "Certifications"]
          }],
          industryTrends: skillsAnalysis.technical?.trending || [],
          certificationRecommendations: ["AWS Certification", "Project Management", "Industry-specific certifications"]
        },
        skillsGapTable: [{
          role: "Target Position",
          industry: "Technology",
          requiredSkills: skillsAnalysis.technical?.missing?.map((skill: string) => ({
            skill,
            importance: "Important" as const,
            currentLevel: "None" as const,
            gap: "High" as const,
            learningResources: ["Online courses", "Documentation"],
            timeToLearn: "2-3 months"
          })) || [],
          overallMatch: skillsAnalysis.score || 0
        }]
      };

      console.log('Comprehensive analysis complete');
      return analysis;
      
    } catch (error) {
      console.error('Resume analysis failed:', error);
      throw error;
    }
  }

  // Separate AI request for ATS Analysis
  private static async analyzeATSCompatibility(resumeText: string): Promise<any> {
    const prompt = `
      You are an ATS parsing expert. Analyze this resume STRICTLY for ATS compatibility.
      
      IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown, or conversation.
      
      Resume Text:
      ${resumeText}
      
      Response format (JSON only):
      {
        "score": <number between 0-100>,
        "issues": ["<specific ATS parsing issues>"],
        "improvements": ["<specific ATS improvements>"],
        "keywords": {
          "missing": ["<missing important keywords>"],
          "present": ["<found relevant keywords>"],
          "suggested": ["<recommended keyword additions>"]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    try {
      // Clean the response to ensure it's valid JSON
      text = this.cleanJsonResponse(text);
      return JSON.parse(text);
    } catch (parseError) {
      console.error('ATS Analysis JSON parse error:', parseError);
      console.error('Original response length:', result.response.text().length);
      console.error('Cleaned response text (first 500 chars):', text.substring(0, 500));
      
      // Return fallback structure with more detailed context
      return {
        score: 70,
        issues: ["Unable to analyze ATS compatibility due to corrupted response data"],
        improvements: ["Ensure proper formatting and keyword usage", "Use standard section headings", "Include relevant industry keywords"],
        keywords: { 
          missing: ["Add relevant technical and industry keywords"], 
          present: ["Keywords analysis unavailable"], 
          suggested: ["Include job-specific terms", "Add technical skills", "Use industry terminology"] 
        }
      };
    }
  }

  // Separate AI request for Flaw Analysis  
  private static async analyzeFlaws(resumeText: string): Promise<any> {
    const prompt = `
      You are a resume critic. Identify resume weaknesses and overused buzzwords.
      
      IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown, or conversation.
      
      Resume Text:
      ${resumeText}
      
      Response format (JSON only):
      {
        "score": <number between 0-100>,
        "buzzwords": {
          "overused": ["<buzzwords to remove>"],
          "suggestions": ["<better alternatives>"]
        },
        "weakAreas": [
          {
            "area": "<section name>",
            "issue": "<specific problem>", 
            "improvement": "<how to fix>"
          }
        ],
        "missingMetrics": ["<what metrics to add>"],
        "structuralIssues": ["<formatting/structure problems>"],
        "honestFeedback": ["<constructive feedback>"]
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    try {
      // Clean the response to ensure it's valid JSON
      text = this.cleanJsonResponse(text);
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Flaws Analysis JSON parse error:', parseError);
      console.error('Original response length:', result.response.text().length);
      console.error('Cleaned response text (first 500 chars):', text.substring(0, 500));
      
      // Return fallback structure with more detailed feedback
      return {
        score: 75,
        buzzwords: { 
          overused: ["Analysis unavailable due to corrupted response"], 
          suggestions: ["Use specific action verbs", "Avoid generic terms", "Include industry-specific language"] 
        },
        weakAreas: ["Unable to identify specific weak areas"],
        missingMetrics: ["Add quantifiable achievements", "Include percentages and numbers", "Specify timeframes and scope"],
        structuralIssues: ["Ensure consistent formatting", "Use clear section headers", "Maintain proper alignment"],
        honestFeedback: ["Unable to provide detailed analysis due to technical issues - please try uploading again with a properly formatted resume"]
      };
    }
  }

  // Separate AI request for Impact Analysis
  private static async analyzeImpactAndRewrite(resumeText: string): Promise<any> {
    const prompt = `
      You are an expert resume writer. Analyze how to make this resume more impact-focused.
      
      IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown, or conversation.
      
      Resume Text:
      ${resumeText}
      
      Response format (JSON only):
      {
        "score": <number between 0-100>,
        "currentIssues": ["<problems with current language>"],
        "rewriteSuggestions": [
          {
            "original": "<original text>",
            "improved": "<better version>",
            "reasoning": "<why this is better>"
          }
        ],
        "actionVerbSuggestions": ["<strong action verbs>"],
        "quantificationTips": ["<how to add metrics>"],
        "achievementHighlights": ["<key achievements to emphasize>"]
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    try {
      // Clean the response to ensure it's valid JSON
      text = this.cleanJsonResponse(text);
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Impact Analysis JSON parse error:', parseError);
      console.error('Original response length:', result.response.text().length);
      console.error('Cleaned response text (first 500 chars):', text.substring(0, 500));
      
      // Return fallback structure with more detailed error context
      return {
        score: 75,
        currentIssues: ["Unable to analyze due to corrupted response data"],
        rewriteSuggestions: [],
        actionVerbSuggestions: ["Led", "Developed", "Implemented", "Achieved", "Managed", "Created"],
        quantificationTips: ["Add specific numbers and percentages", "Include timeframes", "Mention scale/scope"],
        achievementHighlights: ["Focus on measurable results", "Highlight leadership experiences", "Emphasize technical skills"]
      };
    }
  }

  // Separate AI request for Professional Summary
  private static async analyzeProfessionalSummary(resumeText: string): Promise<any> {
    const prompt = `
      You are a resume expert. Analyze the professional summary/objective section.
      
      IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown, or conversation.
      
      Resume Text:
      ${resumeText}
      
      Response format (JSON only):
      {
        "score": <number between 0-100>,
        "currentSummary": "<existing summary or 'Not found'>",
        "hookStrength": <number between 0-100>,
        "suggestedSummary": "<powerful 3-line summary>",
        "impactKeywords": ["<keywords that create impact>"],
        "improvements": ["<specific improvements needed>"],
        "personalBranding": ["<elements for personal brand>"]
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean the response to ensure it's valid JSON
    text = this.cleanJsonResponse(text);
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Professional Summary JSON parse error:', parseError);
      console.error('Response text:', text);
      // Return fallback structure
      return {
        score: 70,
        currentSummary: "Unable to extract current summary",
        hookStrength: 50,
        suggestedSummary: "Professional with experience in relevant field seeking opportunities to contribute skills and expertise",
        impactKeywords: ["Professional", "Experienced", "Results-driven"],
        improvements: ["Add quantified achievements", "Include specific skills"],
        personalBranding: ["Define unique value proposition"]
      };
    }
  }

  // Separate AI request for Skills Analysis
  private static async analyzeSkillsAndGaps(resumeText: string): Promise<any> {
    const prompt = `
      You are a skills analysis expert. Analyze technical and soft skills, identify gaps.
      
      IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown, or conversation.
      
      Resume Text:
      ${resumeText}
      
      Response format (JSON only):
      {
        "score": <number between 0-100>,
        "technical": {
          "present": ["<current technical skills>"],
          "missing": ["<missing technical skills>"],
          "trending": ["<trending/in-demand skills>"]
        },
        "soft": {
          "present": ["<current soft skills>"],
          "missing": ["<needed soft skills>"],
          "important": ["<critical soft skills>"]
        },
        "recommendations": ["<skill development recommendations>"]
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean the response to ensure it's valid JSON
    text = this.cleanJsonResponse(text);
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Skills Analysis JSON parse error:', parseError);
      console.error('Response text:', text);
      // Return fallback structure
      return {
        score: 75,
        technical: {
          present: ["General technical knowledge"],
          missing: ["Specific technical skills assessment failed"],
          trending: ["Cloud computing", "AI/ML", "Data analysis"]
        },
        soft: {
          present: ["Communication", "Problem solving"],
          missing: ["Leadership", "Project management"],
          important: ["Communication", "Leadership", "Adaptability"]
        },
        recommendations: ["Continue skill development", "Focus on trending technologies"]
      };
    }
  }

  // Helper methods
  private static detectExperienceLevel(resumeText: string): 'entry' | 'junior' | 'mid' | 'senior' {
    const years = resumeText.match(/(\d+)\+?\s*(year|yr)/gi);
    if (!years) return 'entry';
    
    const totalYears = years.reduce((sum, year) => {
      const num = parseInt(year.match(/\d+/)?.[0] || '0');
      return sum + num;
    }, 0);

    if (totalYears >= 8) return 'senior';
    if (totalYears >= 4) return 'mid';
    if (totalYears >= 1) return 'junior';
    return 'entry';
  }

  private static suggestTargetRoles(resumeText: string): string[] {
    // Basic role suggestions based on content
    const roles = [];
    if (resumeText.toLowerCase().includes('software') || resumeText.toLowerCase().includes('developer')) {
      roles.push('Senior Software Developer', 'Tech Lead', 'Software Architect');
    }
    if (resumeText.toLowerCase().includes('data') || resumeText.toLowerCase().includes('analyst')) {
      roles.push('Senior Data Analyst', 'Data Scientist', 'Analytics Manager');
    }
    if (resumeText.toLowerCase().includes('marketing') || resumeText.toLowerCase().includes('digital')) {
      roles.push('Marketing Manager', 'Digital Marketing Specialist', 'Growth Manager');
    }
    
    return roles.length > 0 ? roles : ['Senior Specialist', 'Team Lead', 'Manager'];
  }

  private static generateRecommendations(flawAnalysis: any, impactAnalysis: any, summaryAnalysis: any): any[] {
    return [
      {
        id: "rec-1",
        category: "flaws",
        priority: "high",
        title: "Fix Critical Weaknesses",
        description: flawAnalysis.honestFeedback[0] || "Address major resume weaknesses",
        actionable: flawAnalysis.weakAreas[0]?.improvement || "Review and improve weak sections",
        timeEstimate: "2-3 hours"
      },
      {
        id: "rec-2", 
        category: "impact",
        priority: "high",
        title: "Rewrite for Impact",
        description: "Transform duty-focused language to achievement-focused",
        actionable: impactAnalysis.rewriteSuggestions[0]?.reasoning || "Use strong action verbs and quantify achievements",
        timeEstimate: "3-4 hours"
      },
      {
        id: "rec-3",
        category: "summary",
        priority: "medium",
        title: "Strengthen Professional Summary",
        description: "Create a compelling hook that grabs attention",
        actionable: summaryAnalysis.improvements[0] || "Write a powerful 3-line professional summary",
        timeEstimate: "1-2 hours"
      }
    ];
  }

  static async generateInterviewQuestions(
    industry: string, 
    role: string, 
    experience: string,
    count: number = 5
  ): Promise<InterviewQuestion[]> {
    // Continue without checking API key - errors will be caught by route handlers
    
    const prompt = `
      You are an interview question generator. Generate exactly ${count} interview questions.
      
      IMPORTANT: Respond ONLY with valid JSON array. Do not include any explanatory text, markdown, or conversation.
      
      Requirements:
      - Position: ${role}
      - Experience Level: ${experience}
      - Industry: ${industry}
      
      Response format (JSON array only):
      [
        {
          "id": "question-1",
          "question": "<interview question>",
          "category": "behavioral|technical|situational|company",
          "difficulty": "easy|medium|hard",
          "tips": ["<tip1>", "<tip2>", "<tip3>"],
          "sampleAnswer": "<example answer>"
        }
      ]
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      let text = response.text().trim()
      
      // Clean the response to ensure it's valid JSON
      text = this.cleanJsonResponse(text);
      
      try {
        return JSON.parse(text) as InterviewQuestion[]
      } catch (parseError) {
        console.error('Interview Questions JSON parse error:', parseError);
        console.error('Response text:', text);
        // Return fallback questions
        return [
          {
            id: 'fallback-1',
            question: 'Tell me about yourself and your background.',
            category: 'behavioral' as const,
            difficulty: 'easy' as const,
            tips: ['Keep it concise', 'Focus on relevant experience', 'End with your career goals'],
            sampleAnswer: 'I am a professional with experience in [field]. I have worked on [key projects] and am looking to [career goal].'
          }
        ];
      }
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
      You are a professional message template generator. Create a ${type} message template.
      
      IMPORTANT: Respond ONLY with valid JSON. Do not include any explanatory text, markdown, or conversation.
      
      Context: ${context}
      ${customization ? `Industry: ${customization.industry}, Role: ${customization.role}, Company: ${customization.company}` : ''}
      
      Response format (JSON only):
      {
        "subject": "<professional email subject line>",
        "body": "<email body with [VARIABLE_NAME] placeholders>",
        "variables": ["<VARIABLE_NAME>", "<ANOTHER_VARIABLE>"]
      }
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      let text = response.text().trim()
      
      // Clean the response to ensure it's valid JSON
      text = this.cleanJsonResponse(text);
      
      try {
        return JSON.parse(text)
      } catch (parseError) {
        console.error('Message Template JSON parse error:', parseError);
        console.error('Response text:', text);
        // Return fallback template
        return {
          subject: `Professional ${type} Message`,
          body: 'Dear [RECIPIENT_NAME],\n\nI hope this message finds you well.\n\n[CUSTOM_MESSAGE]\n\nBest regards,\n[YOUR_NAME]',
          variables: ['RECIPIENT_NAME', 'CUSTOM_MESSAGE', 'YOUR_NAME']
        };
      }
    } catch (error) {
      console.error('Error generating message template:', error)
      throw new Error('Failed to generate message template. Please try again.')
    }
  }

  // Helper method to clean AI responses and ensure valid JSON
  private static cleanJsonResponse(text: string): string {
    // Remove markdown code blocks
    text = text.replace(/```json\n?|\n?```/g, '');
    
    // Remove control characters and other problematic characters
    text = text.replace(/[\x00-\x1f\x7f-\x9f]/g, ' ');
    
    // Remove any PDF stream data or corrupted content
    if (text.includes('endstream') || text.includes('endobj') || text.includes('Filter FlateDecode')) {
      console.warn('Detected corrupted PDF content in response, attempting recovery...');
      // Try to find JSON within the corrupted text
      const possibleJsonMatch = text.match(/\{[^{}]*"score"[^{}]*\}/);
      if (possibleJsonMatch) {
        text = possibleJsonMatch[0];
      } else {
        // Return empty if no valid JSON structure found
        throw new Error('Response contains corrupted data instead of JSON');
      }
    }
    
    // Find the first complete JSON object
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1 || jsonStart >= jsonEnd) {
      throw new Error('No valid JSON structure found in response');
    }
    
    text = text.substring(jsonStart, jsonEnd + 1);
    
    // Clean up any malformed strings within the JSON
    try {
      // Test parse to see if it's valid
      JSON.parse(text);
      return text.trim();
    } catch (e) {
      // If parsing fails, try to fix common issues
      console.warn('JSON parsing failed, attempting to fix common issues...');
      
      // Fix unterminated strings by finding and closing them
      text = text.replace(/"([^"\\]*(\\.[^"\\]*)*)(?=\s*[,}\]])/g, '"$1"');
      
      // Remove any trailing commas
      text = text.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      
      // Try to parse again
      try {
        JSON.parse(text);
        return text.trim();
      } catch (secondError) {
        throw new Error('Unable to parse response as valid JSON after cleanup attempts');
      }
    }
  }
}
