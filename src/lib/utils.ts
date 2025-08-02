import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.type === 'application/pdf') {
      // For PDF files, we'll need a PDF parser
      const reader = new FileReader()
      reader.onload = () => {
        // This is a simplified version - in production, use pdf-parse or similar
        resolve(reader.result as string)
      }
      reader.onerror = reject
      reader.readAsText(file)
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      // For DOCX files, we'll need mammoth.js or similar
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = reject
      reader.readAsText(file)
    } else if (file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = reject
      reader.readAsText(file)
    } else {
      reject(new Error('Unsupported file type'))
    }
  })
}

export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain'
  ]

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Please upload a PDF, Word document, or text file' 
    }
  }

  return { valid: true }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-100'
  if (score >= 60) return 'bg-yellow-100'
  return 'bg-red-100'
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-100'
    case 'medium': return 'text-yellow-600 bg-yellow-100'
    case 'low': return 'text-blue-600 bg-blue-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function calculateOverallProgress(progress: {
  resumeUploads: number
  analysesCompleted: number
  mockInterviewsCompleted: number
  templatesUsed: number
}): number {
  const weights = {
    resumeUploads: 0.3,
    analysesCompleted: 0.3,
    mockInterviewsCompleted: 0.25,
    templatesUsed: 0.15
  }

  const maxValues = {
    resumeUploads: 5,
    analysesCompleted: 3,
    mockInterviewsCompleted: 10,
    templatesUsed: 15
  }

  let totalScore = 0
  Object.entries(progress).forEach(([key, value]) => {
    const weight = weights[key as keyof typeof weights]
    const maxValue = maxValues[key as keyof typeof maxValues]
    const normalizedScore = Math.min(value / maxValue, 1)
    totalScore += normalizedScore * weight
  })

  return Math.round(totalScore * 100)
}
