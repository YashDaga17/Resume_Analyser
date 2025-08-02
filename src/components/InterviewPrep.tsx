'use client'

import { motion } from 'framer-motion'
import { Video, Mic, Target } from 'lucide-react'

export function InterviewPrep() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Interview <span className="gradient-text">Preparation</span>
          </h1>
          <p className="text-xl text-gray-600">
            Practice with AI-powered mock interviews and get instant feedback
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <Video className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're building an advanced interview preparation system with AI-powered 
            questions and real-time feedback to help you ace your interviews.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-green-50 p-4 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">Mock Interviews</h3>
              <p className="text-green-700 text-sm">Practice with industry-specific questions</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Mic className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">Voice Analysis</h3>
              <p className="text-blue-700 text-sm">Get feedback on speaking pace and clarity</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <Video className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-2">Video Practice</h3>
              <p className="text-purple-700 text-sm">Record and review your responses</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
