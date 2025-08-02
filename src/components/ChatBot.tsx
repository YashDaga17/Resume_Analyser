'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi there! I'm your CareerBoost AI assistant. I'm here to help you with resume advice, interview prep, job search tips, and career guidance. How can I help you today?",
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Get previous context (last 5 messages for context)
      const context = messages.slice(-5)
      
      const apiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          context,
          userInfo: {
            industry: 'Technology', // Could be set from user preferences
            experience: 'Entry Level',
            goals: ['Resume Improvement', 'Interview Skills']
          }
        }),
      })

      if (!apiResponse.ok) {
        throw new Error('Failed to get chat response')
      }

      const { response } = await apiResponse.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment, or feel free to explore our other features like resume analysis and interview prep!",
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "How do I improve my resume for ATS?",
    "What interview tips work best?"
  ]

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Unique Minimal AI Chat Icon */}
      <motion.div
        initial={{ scale: 0, y: 100, rotate: -180 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        transition={{ 
          delay: 0.8, 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          rotate: { duration: 1.2 }
        }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-12 w-12 rounded-xl shadow-lg transition-all duration-500 border group",
            "bg-background hover:bg-accent",
            "border-border hover:border-primary/20",
            "relative overflow-hidden",
            isOpen && "bg-destructive hover:bg-destructive/90 border-destructive"
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -180, scale: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="relative z-10 flex items-center justify-center"
              >
                <X className="h-5 w-5 text-destructive-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="ai-logo"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="relative z-10 flex items-center justify-center"
              >
                {/* Custom minimalist AI logo */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg 
                    className="h-6 w-6 text-foreground" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Brain outline */}
                    <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z" />
                    {/* Neural connections */}
                    <motion.circle 
                      cx="10" 
                      cy="8" 
                      r="1" 
                      fill="currentColor"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.circle 
                      cx="14" 
                      cy="8" 
                      r="1" 
                      fill="currentColor"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    />
                    <motion.circle 
                      cx="12" 
                      cy="12" 
                      r="1" 
                      fill="currentColor"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                    />
                    {/* Connection lines */}
                    <motion.line 
                      x1="10.5" 
                      y1="8.5" 
                      x2="11.5" 
                      y2="11.5"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.line 
                      x1="13.5" 
                      y1="8.5" 
                      x2="12.5" 
                      y2="11.5"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                  </svg>
                  
                  {/* Smart status dot */}
                  <motion.div 
                    className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-background"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window - Redesigned */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-2rem)]"
          >
            <Card className="h-[480px] shadow-2xl border bg-card/95 backdrop-blur-xl">
              <CardHeader className="p-4 bg-background border-b">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-9 w-9 bg-muted rounded-xl flex items-center justify-center">
                      <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10 8 11 7 11V13C8 13 9 14 9 15V17L15 23L21 17V15C21 14 22 13 23 13V11C22 11 21 10 21 9Z"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">AI Career Assistant</h3>
                    <p className="text-xs text-muted-foreground">Ready to help! ✨</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 max-h-[320px] chat-scroll">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex items-start space-x-2 w-full",
                        message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      )}
                    >
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0",
                        message.role === 'user' 
                          ? 'bg-primary' 
                          : 'bg-muted'
                      )}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className={cn(
                        "max-w-[calc(100%-3rem)] p-3 rounded-lg text-sm shadow-sm",
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm border'
                      )}>
                        <div className="break-words whitespace-pre-wrap leading-relaxed word-wrap overflow-hidden">
                          {message.content}
                        </div>
                        <p className={cn(
                          "text-xs mt-2 opacity-70",
                          message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        )}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg rounded-bl-sm border">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </motion.div>
                )}

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <p className="text-xs text-muted-foreground text-center">Quick questions to get started:</p>
                    <div className="space-y-2">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(question)}
                          className="w-full justify-start text-left h-auto p-3 text-xs hover:bg-muted break-words whitespace-normal"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t bg-background/50">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your career..."
                    className="flex-1 border-border focus:border-primary"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="px-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send • AI responses may take a moment
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
