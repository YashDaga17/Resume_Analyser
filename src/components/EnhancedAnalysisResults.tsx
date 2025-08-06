'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Award, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Target,
  BookOpen,
  Star,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Zap,
  Brain,
  Users,
  Clock,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getScoreColor, calculateOverallProgress } from '@/lib/utils'
import type { ResumeAnalysis } from '@/types'

interface EnhancedAnalysisResultsProps {
  analysis: ResumeAnalysis
}

export function EnhancedAnalysisResults({ analysis }: EnhancedAnalysisResultsProps) {
  const { sections, recommendations, overallScore, careerRoadmap, skillsGapTable } = analysis
  
  // Check if this is demo data
  const isDemo = (analysis as any).isDemo || false
  const demoReason = (analysis as any).demoReason || ''
  const message = (analysis as any).message || ''
  
  const renderSkillsGapTable = (roleData: any) => (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="min-w-full inline-block align-middle">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-2 sm:p-3 font-semibold min-w-[120px]">Skill</th>
              <th className="text-left p-2 sm:p-3 font-semibold min-w-[100px]">Importance</th>
              <th className="text-left p-2 sm:p-3 font-semibold min-w-[100px]">Your Level</th>
              <th className="text-left p-2 sm:p-3 font-semibold min-w-[80px]">Gap</th>
              <th className="text-left p-2 sm:p-3 font-semibold min-w-[120px] hidden sm:table-cell">Time to Learn</th>
            </tr>
          </thead>
          <tbody>
            {roleData.requiredSkills.map((skill: any, index: number) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2 sm:p-3 font-medium break-words">{skill.skill}</td>
                <td className="p-2 sm:p-3">
                  <Badge 
                    variant={
                      skill.importance === 'Critical' ? 'destructive' :
                      skill.importance === 'Important' ? 'default' : 'secondary'
                    }
                    className="text-xs whitespace-nowrap"
                  >
                    {skill.importance}
                  </Badge>
                </td>
                <td className="p-2 sm:p-3">
                  <Badge 
                    variant={
                      skill.currentLevel === 'Advanced' ? 'default' :
                      skill.currentLevel === 'Intermediate' ? 'secondary' :
                      skill.currentLevel === 'Beginner' ? 'outline' : 'destructive'
                    }
                    className="text-xs whitespace-nowrap"
                  >
                    {skill.currentLevel}
                  </Badge>
                </td>
                <td className="p-2 sm:p-3">
                  <div className="flex items-center">
                    {skill.gap === 'High' && <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />}
                    {skill.gap === 'Medium' && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />}
                    {skill.gap === 'Low' && <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />}
                    <span className={`text-xs sm:text-sm ${
                      skill.gap === 'High' ? 'text-red-600' :
                      skill.gap === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {skill.gap}
                    </span>
                  </div>
                </td>
                <td className="p-2 sm:p-3 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                  {skill.timeToLearn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Mobile-only time to learn info */}
        <div className="block sm:hidden mt-4 space-y-2">
          <h4 className="font-semibold text-sm">Learning Time Estimates:</h4>
          {roleData.requiredSkills.map((skill: any, index: number) => (
            <div key={index} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
              <span className="font-medium">{skill.skill}</span>
              <span className="text-gray-600">{skill.timeToLearn}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-medium text-sm sm:text-base">Overall Match Score:</span>
          <div className={`text-xl sm:text-2xl font-bold ${getScoreColor(roleData.overallMatch)}`}>
            {roleData.overallMatch}%
          </div>
        </div>
      </div>
    </div>
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Enhanced Resume <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis with actionable insights and career roadmap
          </p>
        </motion.div>

        {/* Demo Indicator */}
        {isDemo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Demo Mode:</strong> {message || "This is sample analysis to demonstrate our capabilities. Upload your resume for personalized insights!"}
                {demoReason && (
                  <div className="text-sm mt-1 opacity-75">
                    Reason: {demoReason}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Overall Score Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${getScoreColor(overallScore)} mb-2`}>
                {overallScore}
              </div>
              <p className="text-gray-600 font-medium text-sm sm:text-base">Overall Score</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(sections.atsCompatibility.score)} mb-2`}>
                {sections.atsCompatibility.score}%
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">ATS Compatible</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(sections.flawAnalysis?.score || 0)} mb-2`}>
                {sections.flawAnalysis?.score || 0}%
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">Content Quality</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(sections.impactRewrite?.score || 0)} mb-2`}>
                {sections.impactRewrite?.score || 0}%
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">Impact Score</p>
            </div>
          </div>
        </motion.div>

        {/* Main Analysis Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto p-1">
              <TabsTrigger value="overview" className="text-xs sm:text-sm py-2 px-2 sm:px-4">Overview</TabsTrigger>
              <TabsTrigger value="flaws" className="text-xs sm:text-sm py-2 px-2 sm:px-4">Spot Flaws</TabsTrigger>
              <TabsTrigger value="impact" className="text-xs sm:text-sm py-2 px-2 sm:px-4">Impact</TabsTrigger>
              <TabsTrigger value="ats" className="text-xs sm:text-sm py-2 px-2 sm:px-4">ATS</TabsTrigger>
              <TabsTrigger value="skills" className="text-xs sm:text-sm py-2 px-2 sm:px-4">Skills Gap</TabsTrigger>
              <TabsTrigger value="roadmap" className="text-xs sm:text-sm py-2 px-2 sm:px-4">Roadmap</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Professional Summary Analysis */}
                {sections.professionalSummary && (
                  <Card className="lg:col-span-3">
                    <CardHeader className="pb-3 sm:pb-6">
                      <CardTitle className="flex items-center text-lg sm:text-xl">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Professional Summary Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                          <span className="font-medium text-sm sm:text-base">Hook Strength:</span>
                          <span className={`font-bold text-lg sm:text-xl ${getScoreColor(sections.professionalSummary.hookStrength)}`}>
                            {sections.professionalSummary.hookStrength}%
                          </span>
                        </div>
                        <Progress value={sections.professionalSummary.hookStrength} className="h-2" />
                      </div>
                      
                      {sections.professionalSummary.currentSummary !== 'Not found' && (
                        <div>
                          <p className="font-medium mb-2 text-sm sm:text-base">Current Summary:</p>
                          <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {sections.professionalSummary.currentSummary}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <p className="font-medium mb-2 text-sm sm:text-base">Suggested Improvement:</p>
                        <p className="text-xs sm:text-sm text-blue-700 bg-blue-50 p-3 rounded">
                          {sections.professionalSummary.suggestedSummary}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Wins */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
                      Quick Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      {recommendations
                        .filter(rec => rec.priority === 'high')
                        .slice(0, 3)
                        .map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs sm:text-sm">{rec.actionable}</p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience Level */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                      Experience Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-purple-600 capitalize mb-2">
                        {sections.experience.level}
                      </div>
                      <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(sections.experience.score)} mb-4`}>
                        {sections.experience.score}%
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        {sections.experience.strengths.slice(0, 2).map((strength, index) => (
                          <Badge key={index} variant="secondary" className="text-xs block sm:inline-block mb-1">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Grammar & Formatting */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                      Grammar & Format
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs sm:text-sm">Grammar</span>
                          <span className={`font-bold text-sm sm:text-base ${getScoreColor(sections.grammar.score)}`}>
                            {sections.grammar.score}%
                          </span>
                        </div>
                        <Progress value={sections.grammar.score} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs sm:text-sm">Formatting</span>
                          <span className={`font-bold text-sm sm:text-base ${getScoreColor(sections.formatting.score)}`}>
                            {sections.formatting.score}%
                          </span>
                        </div>
                        <Progress value={sections.formatting.score} className="h-2" />
                      </div>
                      {sections.grammar.errors.length > 0 && (
                        <p className="text-xs text-red-600">
                          {sections.grammar.errors.length} errors found
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Spot Flaws Tab */}
            <TabsContent value="flaws" className="space-y-4 sm:space-y-6">
              {sections.flawAnalysis && (
                <>
                  <Card>
                    <CardHeader className="pb-3 sm:pb-6">
                      <CardTitle className="flex items-center text-lg sm:text-xl">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
                        Brutal Honest Feedback
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Areas that need immediate attention from a recruiter's perspective
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        {sections.flawAnalysis.honestFeedback.map((feedback, index) => (
                          <Alert key={index}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-xs sm:text-sm">{feedback}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Overused Buzzwords */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg">Overused Buzzwords</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Replace these generic terms</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 sm:space-y-3">
                          {sections.flawAnalysis.buzzwords.overused.map((word, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 bg-red-50 rounded gap-2">
                              <span className="text-red-700 font-medium text-xs sm:text-sm">{word}</span>
                              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hidden sm:block" />
                              <span className="text-green-700 text-xs sm:text-sm">
                                {sections.flawAnalysis.buzzwords.suggestions[index] || 'More specific term'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Weak Areas */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg">Weak Areas</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Sections that need strengthening</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                          {sections.flawAnalysis.weakAreas.map((area, index) => (
                            <div key={index} className="border-l-4 border-orange-400 pl-3 sm:pl-4">
                              <h4 className="font-semibold text-orange-700 text-sm sm:text-base">{area.area}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1">{area.issue}</p>
                              <p className="text-xs sm:text-sm text-blue-600">{area.improvement}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Missing Metrics */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base sm:text-lg">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Missing Metrics & Quantification
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {sections.flawAnalysis.missingMetrics.map((metric, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 bg-yellow-50 rounded">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Impact Rewrite Tab */}
            <TabsContent value="impact" className="space-y-6">
              {sections.impactRewrite && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        Before & After Transformations
                      </CardTitle>
                      <CardDescription>
                        See how to transform your resume content for maximum impact
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {sections.impactRewrite.rewriteSuggestions.map((suggestion, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold text-red-600 mb-2">❌ Before (Weak)</h4>
                                <p className="text-sm bg-red-50 p-3 rounded text-red-700">
                                  {suggestion.original}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-green-600 mb-2">✅ After (Strong)</h4>
                                <p className="text-sm bg-green-50 p-3 rounded text-green-700">
                                  {suggestion.improved}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-blue-50 rounded">
                              <p className="text-xs text-blue-700">
                                <strong>Why this works:</strong> {suggestion.reasoning}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Action Verbs */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Powerful Action Verbs</CardTitle>
                        <CardDescription>Use these instead of weak verbs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {sections.impactRewrite.actionVerbSuggestions.map((verb, index) => (
                            <Badge key={index} variant="outline" className="text-blue-600">
                              {verb}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quantification Tips */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quantification Tips</CardTitle>
                        <CardDescription>Add numbers to your achievements</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {sections.impactRewrite.quantificationTips.map((tip, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            {/* ATS Tab */}
            <TabsContent value="ats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Keywords Present
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {sections.atsCompatibility.keywords.present.map((keyword, index) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                      Missing Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {sections.atsCompatibility.keywords.missing.map((keyword, index) => (
                        <Badge key={index} variant="destructive" className="bg-red-100 text-red-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>ATS Issues & Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sections.atsCompatibility.issues.map((issue, index) => (
                      <div key={index} className="flex justify-between items-start p-3 bg-red-50 rounded">
                        <span className="text-red-700 text-sm flex-1">{issue}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 mx-2 mt-0.5" />
                        <span className="text-green-700 text-sm flex-1">
                          {sections.atsCompatibility.improvements[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Gap Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-blue-500" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">✅ You Have</h4>
                        <div className="flex flex-wrap gap-2">
                          {sections.skillsGaps.technical.present.map((skill, index) => (
                            <Badge key={index} variant="default" className="bg-green-100 text-green-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">❌ Missing</h4>
                        <div className="flex flex-wrap gap-2">
                          {sections.skillsGaps.technical.missing.map((skill, index) => (
                            <Badge key={index} variant="destructive" className="bg-red-100 text-red-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-600 mb-2">🔥 Trending</h4>
                        <div className="flex flex-wrap gap-2">
                          {sections.skillsGaps.technical.trending.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-orange-500" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">✅ Demonstrated</h4>
                        <div className="flex flex-wrap gap-2">
                          {sections.skillsGaps.soft.present.map((skill, index) => (
                            <Badge key={index} variant="default" className="bg-green-100 text-green-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">❌ Need to Show</h4>
                        <div className="flex flex-wrap gap-2">
                          {sections.skillsGaps.soft.missing.map((skill, index) => (
                            <Badge key={index} variant="destructive" className="bg-red-100 text-red-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">⭐ Most Important</h4>
                        <div className="flex flex-wrap gap-2">
                          {sections.skillsGaps.soft.important.map((skill, index) => (
                            <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Gap Tables */}
              {skillsGapTable && skillsGapTable.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Skills Gap Analysis by Role</h3>
                  {skillsGapTable.map((roleData, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{roleData.role} - {roleData.industry}</span>
                          <Badge variant={roleData.overallMatch >= 70 ? 'default' : roleData.overallMatch >= 50 ? 'secondary' : 'destructive'}>
                            {roleData.overallMatch}% Match
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderSkillsGapTable(roleData)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Career Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-6">
              {careerRoadmap && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="w-5 h-5 mr-2 text-purple-500" />
                        Career Progression Path
                      </CardTitle>
                      <CardDescription>
                        Your journey from {careerRoadmap.currentLevel} to your target roles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {careerRoadmap.skillProgression.map((progression, index) => (
                          <div key={index} className="border-l-4 border-blue-400 pl-6 relative">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-400 rounded-full"></div>
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">{progression.role}</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              <Clock className="w-4 h-4 inline mr-1" />
                              Time to achieve: {progression.timeToAchieve}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Required Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {progression.requiredSkills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="outline">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Learning Path:</h4>
                                <ul className="text-sm space-y-1">
                                  {progression.learningPath.map((step, stepIndex) => (
                                    <li key={stepIndex} className="flex items-start">
                                      <ArrowRight className="w-3 h-3 mt-1 mr-2 text-gray-400" />
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                          Industry Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {careerRoadmap.industryTrends.map((trend, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-sm">{trend}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                          Recommended Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {careerRoadmap.certificationRecommendations.map((cert, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Your Action Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
                Immediate (This Week)
              </h3>
              <ul className="space-y-2">
                {recommendations
                  .filter(rec => rec.priority === 'high')
                  .slice(0, 3)
                  .map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700">{rec.actionable}</span>
                    </li>
                  ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
                Short-term (This Month)
              </h3>
              <ul className="space-y-2">
                {recommendations
                  .filter(rec => rec.priority === 'medium')
                  .slice(0, 3)
                  .map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700">{rec.actionable}</span>
                    </li>
                  ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                Long-term (Next Quarter)
              </h3>
              <ul className="space-y-2">
                {recommendations
                  .filter(rec => rec.priority === 'low')
                  .slice(0, 3)
                  .map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700">{rec.actionable}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
              Practice Interview Questions
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 text-sm">
              Get Message Templates
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-sm">
              Download Action Plan
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
