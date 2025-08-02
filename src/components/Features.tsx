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
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
      description: 'Get instant feedback on ATS compatibility, skills gaps, and formatting improvements.',
      benefits: ['ATS Optimization', 'Skills Analysis', 'Grammar Check'],
      onClick: onResumeAnalysis
    },
    {
      icon: MessageCircle,
      title: 'Message Templates',
      description: 'Professional templates for recruiter outreach and networking.',
      benefits: ['Recruiter Outreach', 'Follow-up Messages', 'Thank-you Notes'],
      onClick: onMessageTemplates
    },
    {
      icon: Video,
      title: 'Interview Prep',
      description: 'Practice with AI-generated questions and get instant feedback.',
      benefits: ['Mock Interviews', 'Instant Feedback', 'Performance Tracking'],
      onClick: onInterviewPrep
    },
    {
      icon: BarChart3,
      title: 'Progress Dashboard',
      description: 'Track your career development with personalized insights.',
      benefits: ['Progress Tracking', 'Achievement Badges', 'Weekly Goals'],
      onClick: onDashboard
    }
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Career Toolkit</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered tools to boost your job search and career development.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full" onClick={feature.onClick}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-6">{feature.description}</CardDescription>
                    
                    <div className="space-y-2 mb-6">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={feature.onClick}
                      className="w-full group-hover:translate-x-1 transition-transform"
                      variant="outline"
                    >
                      <span>Explore Feature</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Instant Results</h4>
                  <p className="text-muted-foreground text-sm">Get immediate feedback and insights.</p>
                </div>

                <div>
                  <Heart className="w-8 h-8 text-secondary-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Student-Focused</h4>
                  <p className="text-muted-foreground text-sm">Designed for young professionals.</p>
                </div>

                <div>
                  <Shield className="w-8 h-8 text-accent-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Privacy First</h4>
                  <p className="text-muted-foreground text-sm">Your data stays secure and private.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
