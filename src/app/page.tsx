'use client'

import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { ResumeUpload } from '@/components/ResumeUpload'
import { AnalysisResults } from '@/components/AnalysisResults'
import { MessageTemplates } from '@/components/MessageTemplates'
import { InterviewPrep } from '@/components/InterviewPrep'
import { ProgressDashboard } from '@/components/ProgressDashboard'
import type { ResumeAnalysis } from '@/types'

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'analysis' | 'templates' | 'interview' | 'dashboard'>('home')
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null)

  const handleAnalysisComplete = (analysis: ResumeAnalysis) => {
    setResumeAnalysis(analysis)
    setCurrentView('analysis')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'upload':
        return <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
      case 'analysis':
        return resumeAnalysis ? <AnalysisResults analysis={resumeAnalysis} /> : null
      case 'templates':
        return <MessageTemplates />
      case 'interview':
        return <InterviewPrep />
      case 'dashboard':
        return <ProgressDashboard />
      default:
        return (
          <>
            <Hero onGetStarted={() => setCurrentView('upload')} />
            <Features 
              onResumeAnalysis={() => setCurrentView('upload')}
              onMessageTemplates={() => setCurrentView('templates')}
              onInterviewPrep={() => setCurrentView('interview')}
              onDashboard={() => setCurrentView('dashboard')}
            />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold gradient-text">CareerBoost</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentView('upload')}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Resume Analysis
              </button>
              <button 
                onClick={() => setCurrentView('templates')}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Message Templates
              </button>
              <button 
                onClick={() => setCurrentView('interview')}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Interview Prep
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Dashboard
              </button>
            </div>
            
            <button 
              onClick={() => setCurrentView('upload')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pb-20">
        {renderCurrentView()}
      </div>
    </div>
  )
}
