'use client'

import { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { ResumeUpload } from '@/components/ResumeUpload'
import { AnalysisResults } from '@/components/AnalysisResults'
import { MessageTemplates } from '@/components/MessageTemplates'
import { InterviewPrep } from '@/components/InterviewPrep'
import { ProgressDashboard } from '@/components/ProgressDashboard'
import { Button } from '@/components/ui/button'
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
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">CareerBoost</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost"
                onClick={() => setCurrentView('upload')}
              >
                Resume Analysis
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setCurrentView('templates')}
              >
                Message Templates
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setCurrentView('interview')}
              >
                Interview Prep
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setCurrentView('dashboard')}
              >
                Dashboard
              </Button>
            </div>
            
            <Button 
              onClick={() => setCurrentView('upload')}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              Get Started
            </Button>
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
