'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, X } from 'lucide-react'
import { extractTextFromFile, validateResumeFile, formatFileSize } from '@/lib/utils'
import type { ResumeAnalysis } from '@/types'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

// Declare global interface for AdSense
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface ResumeUploadProps {
  onAnalysisComplete: (analysis: ResumeAnalysis) => void
}

export function ResumeUpload({ onAnalysisComplete }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        setError('File size must be less than 10MB')
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        setError('Please upload a PDF, Word document, or text file')
      } else {
        setError('Invalid file. Please try again.')
      }
      return
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      const validation = validateResumeFile(selectedFile)
      
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }

      setFile(selectedFile)
      toast.success('File uploaded successfully!')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      toast.loading('Analyzing your resume...', { duration: 2000 })
      
      const resumeText = await extractTextFromFile(file)
      
      if (!resumeText.trim()) {
        throw new Error('Unable to extract text from the file. Please ensure your resume contains readable text.')
      }

      // Call the API route instead of the Gemini service directly
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          fileName: file.name,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze resume')
      }

      const analysis = await response.json()
      
      toast.success('Analysis complete!')
      onAnalysisComplete(analysis)
      
    } catch (error) {
      console.error('Analysis error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze resume. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
  }

  // Add useEffect for AdSense
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upload Your <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant AI-powered feedback on your resume's ATS compatibility and areas for improvement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-2">
            <CardContent className="p-8">
              {!file ? (
                /* File Upload Area */
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
                    ${isDragActive 
                      ? 'border-primary bg-primary/5 scale-105' 
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center transition-colors
                      ${isDragActive ? 'bg-primary/10' : 'bg-muted/20'}
                    `}>
                      <Upload className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop your file here, or click to browse
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <Badge variant="default">TXT (best)</Badge>
                        <Badge variant="secondary">DOCX</Badge>
                        <Badge variant="outline">PDF (demo only)</Badge>
                        <Badge variant="outline">Max 10MB</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        💡 TXT format gives the most accurate analysis
                      </p>
                    </div>

                    <Button 
                      type="button"
                      size="lg"
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              ) : (
                /* File Preview and Analysis */
                <div className="space-y-6">
                  {/* File Info */}
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          disabled={isAnalyzing}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Analysis Button */}
                  <div className="text-center">
                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing Resume...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Analyze My Resume
                        </>
                      )}
                    </Button>
                    
                    {isAnalyzing && (
                      <p className="text-sm text-muted-foreground mt-3">
                        This may take 10-30 seconds. We're analyzing your resume for ATS compatibility, 
                        skills gaps, and improvement opportunities.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Upload Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes ATS compatibility, skills gaps, experience enhancement, and formatting for professional improvement.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Google AdSense - Non-intrusive placement at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 mb-8"
          >
            <div className="text-center mb-4">
              <p className="text-xs text-muted-foreground">Advertisement</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7701180604741961"
                data-ad-slot="4303950704"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
