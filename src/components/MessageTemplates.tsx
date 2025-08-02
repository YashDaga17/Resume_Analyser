'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Copy, Edit, Search } from 'lucide-react'

export function MessageTemplates() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Message <span className="gradient-text">Templates</span>
          </h1>
          <p className="text-xl text-gray-600">
            Professional templates for networking, recruiter outreach, and follow-ups
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <MessageSquare className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're crafting the perfect collection of message templates to help you 
            connect with recruiters and build your professional network.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Recruiter Outreach</h3>
              <p className="text-purple-700 text-sm">Professional templates for LinkedIn and email</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Follow-up Messages</h3>
              <p className="text-blue-700 text-sm">Keep the conversation going after interviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
