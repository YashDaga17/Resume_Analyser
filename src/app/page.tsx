'use client'

import { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { ResumeUpload } from '@/components/ResumeUpload'
import { EnhancedAnalysisResults } from '@/components/EnhancedAnalysisResults'
import { MessageTemplates } from '@/components/MessageTemplates'
import { InterviewPrep } from '@/components/InterviewPrep'
import { ProgressDashboard } from '@/components/ProgressDashboard'
import { Button } from '@/components/ui/button'
import { 
  AdSenseContext, 
  AdSenseScript, 
  ContentAwareAds, 
  useAdSenseCompliance 
} from '@/components/AdSenseCompliant'
import type { ResumeAnalysis } from '@/types'

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'analysis' | 'templates' | 'interview' | 'dashboard'>('home')
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null)
  const adSenseCompliance = useAdSenseCompliance()

  const handleAnalysisComplete = (analysis: ResumeAnalysis) => {
    setResumeAnalysis(analysis)
    setCurrentView('analysis')
  }

  // Update content context when view changes
  useEffect(() => {
    const getContentLength = () => {
      switch (currentView) {
        case 'home':
          return 800 // Hero + Features content
        case 'analysis':
          return resumeAnalysis ? 2000 : 0 // Substantial analysis content
        case 'templates':
          return 600 // Message templates content
        case 'interview':
          return 500 // Interview prep content
        case 'dashboard':
          return 400 // Progress dashboard content
        case 'upload':
          return 0 // No ads on upload screen
        default:
          return 0
      }
    }

    adSenseCompliance.updateContentContext(currentView, getContentLength())
  }, [currentView, resumeAnalysis, adSenseCompliance])

  const renderCurrentView = () => {
    switch (currentView) {
      case 'upload':
        return <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
      case 'analysis':
        return resumeAnalysis ? (
          <div>
            <ContentAwareAds />
            <EnhancedAnalysisResults analysis={resumeAnalysis} />
          </div>
        ) : null
      case 'templates':
        return (
          <div>
            <ContentAwareAds />
            <MessageTemplates />
          </div>
        )
      case 'interview':
        return <InterviewPrep />
      case 'dashboard':
        return <ProgressDashboard />
      default:
        return (
          <div>
            <Hero onGetStarted={() => setCurrentView('upload')} />
            <ContentAwareAds />
            <Features 
              onResumeAnalysis={() => setCurrentView('upload')}
              onMessageTemplates={() => setCurrentView('templates')}
              onInterviewPrep={() => setCurrentView('interview')}
              onDashboard={() => setCurrentView('dashboard')}
            />
          </div>
        )
    }
  }

  return (
    <AdSenseContext.Provider value={{
      hasSubstantialContent: adSenseCompliance.hasSubstantialContent,
      pageType: adSenseCompliance.pageType,
      contentLength: adSenseCompliance.contentLength,
      isAdSenseReady: adSenseCompliance.isAdSenseReady
    }}>
      <AdSenseScript onLoad={() => adSenseCompliance.setIsAdSenseReady(true)} />
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm sm:text-lg">C</span>
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  CareerBoost
                </span>
              </div>
              
              <div className="hidden lg:flex items-center space-x-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('upload')}
                >
                  Resume Analysis
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('templates')}
                >
                  Message Templates
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('interview')}
                >
                  Interview Prep
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('dashboard')}
                >
                  Dashboard
                </Button>
              </div>
              
              <Button 
                onClick={() => setCurrentView('upload')}
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-xs sm:text-sm"
              >
                Get Started
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pb-20 sm:pb-24 md:pb-20">
          {renderCurrentView()}
        </div>
        
        {/* Footer - only show with substantial content */}
        {adSenseCompliance.hasSubstantialContent && (
          <footer className="bg-gray-50 border-t py-6 sm:py-8 mt-12 sm:mt-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="mb-4">
                <ContentAwareAds />
              </div>
              <p className="text-gray-600 text-sm">
                © 2025 CareerBoost. Built with AI to help students and professionals succeed.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
              </div>
            </div>
          </footer>
        )}
        
        {/* Mobile spacing for sticky footer ad */}
        {adSenseCompliance.hasSubstantialContent && (
          <div className="block md:hidden h-16"></div>
        )}
      </div>
    </AdSenseContext.Provider>
  )
}
