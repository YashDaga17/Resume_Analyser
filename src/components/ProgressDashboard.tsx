'use client'

import { motion } from 'framer-motion'
import { BarChart3, Trophy, Target } from 'lucide-react'

export function ProgressDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Progress <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600">
            Track your career development journey and celebrate your achievements
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <BarChart3 className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're creating a comprehensive dashboard to help you track your progress, 
            set goals, and celebrate your career development milestones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold text-yellow-900 mb-2">Achievements</h3>
              <p className="text-yellow-700 text-sm">Unlock badges for completing tasks</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">Goal Setting</h3>
              <p className="text-blue-700 text-sm">Set and track weekly career goals</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">Analytics</h3>
              <p className="text-green-700 text-sm">Visualize your improvement over time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
