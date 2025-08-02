'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Award, 
  FileText,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getScoreColor, calculateOverallProgress } from '@/lib/utils'
import type { ResumeAnalysis } from '@/types'

interface AnalysisResultsProps {
  analysis: ResumeAnalysis
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { sections, recommendations, overallScore } = analysis
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Resume <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-xl text-gray-600">
            Here's your detailed analysis with actionable insights to improve your resume
          </p>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(overallScore)} mb-2`}>
                {overallScore}
              </div>
              <p className="text-gray-600 font-medium">Overall Score</p>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {overallScore >= 80 ? 'Excellent!' : overallScore >= 60 ? 'Good Progress!' : 'Room for Improvement'}
              </h3>
              <p className="text-gray-600">
                {overallScore >= 80 
                  ? 'Your resume is in great shape! Just a few minor tweaks needed.'
                  : overallScore >= 60 
                  ? 'You\'re on the right track! Let\'s polish a few areas.'
                  : 'Don\'t worry! We\'ve identified key areas to enhance your resume.'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">ATS Compatibility</h3>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(sections.atsCompatibility.score)} mb-2`}>
              {sections.atsCompatibility.score}%
            </div>
            <p className="text-sm text-gray-600">
              {sections.atsCompatibility.issues.length} issues found
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Skills Analysis</h3>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(sections.skillsGaps.score)} mb-2`}>
              {sections.skillsGaps.score}%
            </div>
            <p className="text-sm text-gray-600">
              {sections.skillsGaps.technical.missing.length} skills to add
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Experience</h3>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(sections.experience.score)} mb-2`}>
              {sections.experience.score}%
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {sections.experience.level} level
            </p>
          </motion.div>
        </div>

        {/* Top Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Priority Recommendations</h2>
          <div className="space-y-4">
            {recommendations.slice(0, 5).map((rec, index) => (
              <div key={rec.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${rec.priority === 'high' ? 'bg-red-100 text-red-700' : 
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-blue-100 text-blue-700'}
                `}>
                  {rec.priority.toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                  <p className="text-blue-600 text-sm font-medium">{rec.actionable}</p>
                  <p className="text-gray-500 text-xs mt-1">Estimated time: {rec.timeEstimate}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Immediate Actions</h3>
              <ul className="space-y-2">
                {analysis.nextSteps.slice(0, 3).map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Continue Your Journey</h3>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Practice Interview Questions
              </button>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Get Message Templates
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
