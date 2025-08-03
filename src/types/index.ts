export interface ResumeAnalysis {
  fileName: string
  analysisId: string
  timestamp: Date
  overallScore: number
  sections: {
    atsCompatibility: ATSAnalysis
    skillsGaps: SkillsAnalysis
    experience: ExperienceAnalysis
    grammar: GrammarAnalysis
    formatting: FormattingAnalysis
    flawAnalysis: FlawAnalysis
    impactRewrite: ImpactAnalysis
    professionalSummary: SummaryAnalysis
  }
  recommendations: Recommendation[]
  nextSteps: string[]
  careerRoadmap: CareerRoadmap
  skillsGapTable: SkillsGapTable[]
}

export interface ATSAnalysis {
  score: number
  issues: string[]
  improvements: string[]
  keywords: {
    missing: string[]
    present: string[]
    suggested: string[]
  }
}

export interface SkillsAnalysis {
  score: number
  technical: {
    present: string[]
    missing: string[]
    trending: string[]
  }
  soft: {
    present: string[]
    missing: string[]
    important: string[]
  }
  recommendations: string[]
}

export interface ExperienceAnalysis {
  score: number
  level: 'entry' | 'junior' | 'mid' | 'senior'
  strengths: string[]
  gaps: string[]
  suggestions: string[]
  projectIdeas: string[]
}

export interface GrammarAnalysis {
  score: number
  errors: {
    type: 'spelling' | 'grammar' | 'punctuation'
    text: string
    suggestion: string
    line?: number
  }[]
  improvements: string[]
}

export interface FormattingAnalysis {
  score: number
  issues: string[]
  positives: string[]
  suggestions: string[]
}

export interface Recommendation {
  id: string
  category: 'ats' | 'skills' | 'experience' | 'grammar' | 'formatting'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  actionable: string
  timeEstimate: string
}

export interface MessageTemplate {
  id: string
  title: string
  category: 'recruiter' | 'followup' | 'networking' | 'interview' | 'feedback'
  subject: string
  body: string
  variables: string[]
  tags: string[]
}

export interface InterviewQuestion {
  id: string
  question: string
  category: 'behavioral' | 'technical' | 'situational' | 'company'
  difficulty: 'easy' | 'medium' | 'hard'
  tips: string[]
  sampleAnswer?: string
}

export interface MockInterview {
  id: string
  date: Date
  questions: InterviewQuestion[]
  responses: string[]
  feedback: string[]
  overallScore: number
  areasOfImprovement: string[]
}

export interface UserProgress {
  resumeUploads: number
  analysesCompleted: number
  mockInterviewsCompleted: number
  templatesUsed: number
  skillsImproved: string[]
  achievements: Achievement[]
  weeklyGoals: Goal[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  category: 'resume' | 'interview' | 'networking' | 'skills'
}

export interface Goal {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: Date
  category: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'text' | 'suggestion' | 'encouragement'
}

export interface UserSession {
  id: string
  userId?: string
  startTime: Date
  lastActivity: Date
  progress: UserProgress
  preferences: {
    industry?: string
    careerLevel?: string
    targetRoles?: string[]
    communicationStyle?: 'professional' | 'casual' | 'encouraging'
  }
}

export interface FlawAnalysis {
  score: number
  buzzwords: {
    overused: string[]
    suggestions: string[]
  }
  weakAreas: {
    area: string
    issue: string
    improvement: string
  }[]
  missingMetrics: string[]
  structuralIssues: string[]
  honestFeedback: string[]
}

export interface ImpactAnalysis {
  score: number
  currentIssues: string[]
  rewriteSuggestions: {
    original: string
    improved: string
    reasoning: string
  }[]
  actionVerbSuggestions: string[]
  quantificationTips: string[]
  achievementHighlights: string[]
}

export interface SummaryAnalysis {
  score: number
  currentSummary: string
  hookStrength: number
  suggestedSummary: string
  impactKeywords: string[]
  improvements: string[]
  personalBranding: string[]
}

export interface CareerRoadmap {
  currentLevel: string
  targetRoles: string[]
  skillProgression: {
    role: string
    requiredSkills: string[]
    timeToAchieve: string
    learningPath: string[]
  }[]
  industryTrends: string[]
  certificationRecommendations: string[]
}

export interface SkillsGapTable {
  role: string
  industry: string
  requiredSkills: {
    skill: string
    importance: 'Critical' | 'Important' | 'Nice to Have'
    currentLevel: 'None' | 'Beginner' | 'Intermediate' | 'Advanced'
    gap: 'High' | 'Medium' | 'Low'
    learningResources: string[]
    timeToLearn: string
  }[]
  overallMatch: number
}
