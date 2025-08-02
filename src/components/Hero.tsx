'use client'

import { motion } from 'framer-motion'
import { Upload, MessageSquare, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface HeroProps {
  onGetStarted: () => void
  onLearnMore?: () => void
}

export function Hero({ onGetStarted, onLearnMore }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Boost Your Career
            </span>
            <br />
            <span className="text-foreground">
              with AI-Powered Guidance
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered resume analysis, interview prep, and career guidance for students and young professionals.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-4 text-center border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Resume Analysis</h3>
                <p className="text-sm text-muted-foreground">Instant ATS feedback</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="p-4 text-center border-0 bg-gradient-to-br from-secondary/5 to-secondary/10">
                <MessageSquare className="w-8 h-8 text-secondary-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">AI Chat</h3>
                <p className="text-sm text-muted-foreground">24/7 career guidance</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-4 text-center border-0 bg-gradient-to-br from-accent/5 to-accent/10">
                <Users className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Interview Prep</h3>
                <p className="text-sm text-muted-foreground">Mock interviews</p>
              </Card>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 h-auto"
            >
              <span>Start Your Career Journey</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={onLearnMore || (() => {
                // Scroll to features section if no onLearnMore handler
                const featuresSection = document.querySelector('#features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              })}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
