'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  MessageCircle, 
  Video, 
  BarChart3, 
  Zap, 
  Shield, 
  Heart, 
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

interface FeaturesProps {
  onResumeAnalysis: () => void
  onMessageTemplates: () => void
  onInterviewPrep: () => void
  onDashboard: () => void
}

export function Features({ onResumeAnalysis, onMessageTemplates, onInterviewPrep, onDashboard }: FeaturesProps) {
  const features = [
    {
      icon: FileText,
      title: 'AI Resume Analysis',
      description: 'Get instant feedback on ATS compatibility, skill gaps, formatting, and grammar. Perfect for students with limited experience.',
      benefits: ['ATS Score & Optimization', 'Skills Gap Analysis', 'Grammar & Formatting Check', 'Experience Enhancement Tips'],
      color: 'blue',
      onClick: onResumeAnalysis
    },
    {
      icon: MessageCircle,
      title: 'Ready-Made Templates',
      description: 'Professional message templates for reaching out to recruiters, following up, and networking effectively.',
      benefits: ['Recruiter Outreach Templates', 'Follow-up Messages', 'Networking Scripts', 'Interview Thank-you Notes'],
      color: 'purple',
      onClick: onMessageTemplates
    },
    {
      icon: Video,
      title: 'Interview Preparation',
      description: 'Practice with AI-generated questions and get instant feedback to ace your interviews with confidence.',
      benefits: ['Mock Interview Sessions', 'Industry-Specific Questions', 'Instant Feedback', 'Performance Tracking'],
      color: 'green',
      onClick: onInterviewPrep
    },
    {
      icon: BarChart3,
      title: 'Progress Dashboard',
      description: 'Track your career development journey with personalized insights and achievement badges.',
      benefits: ['Progress Tracking', 'Achievement Badges', 'Weekly Goals', 'Performance Analytics'],
      color: 'yellow',
      onClick: onDashboard
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100',
        button: 'bg-blue-600 hover:bg-blue-700',
        accent: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        iconBg: 'bg-purple-100',
        button: 'bg-purple-600 hover:bg-purple-700',
        accent: 'text-purple-600'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        iconBg: 'bg-green-100',
        button: 'bg-green-600 hover:bg-green-700',
        accent: 'text-green-600'
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600',
        iconBg: 'bg-yellow-100',
        button: 'bg-yellow-600 hover:bg-yellow-700',
        accent: 'text-yellow-600'
      }
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive career tools designed specifically for students and young professionals 
            starting their journey to career success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`${colors.bg} rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                onClick={feature.onClick}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${colors.iconBg} p-3 rounded-xl`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className={`w-4 h-4 ${colors.accent}`} />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={feature.onClick}
                      className={`${colors.button} text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 group-hover:translate-x-1`}
                    >
                      <span>Explore Feature</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose CareerBoost?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h4>
              <p className="text-gray-600">Get immediate feedback and insights to improve your job search strategy right away.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Student-Focused</h4>
              <p className="text-gray-600">Designed specifically for students and young professionals with empathetic, encouraging guidance.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h4>
              <p className="text-gray-600">Your resume and personal information are kept secure and private at all times.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
