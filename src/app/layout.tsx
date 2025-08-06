import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ChatBot } from '@/components/ChatBot'
import AMPAutoAds from '@/components/AMPAutoAds'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://career-boost.vercel.app' : 'http://localhost:3000'),
  title: 'CareerBoost - AI-Powered Career Assistant for Students',
  description: 'Upload your resume for AI analysis, get interview prep, and receive personalized career guidance. Perfect for students and young professionals.',
  keywords: ['resume analysis', 'career guidance', 'interview prep', 'job search', 'students', 'AI assistant'],
  authors: [{ name: 'CareerBoost Team' }],
  openGraph: {
    title: 'CareerBoost - AI-Powered Career Assistant',
    description: 'Get personalized career guidance and resume analysis',
    type: 'website',
    url: process.env.NODE_ENV === 'production' ? 'https://career-boost.vercel.app' : 'http://localhost:3000',
    siteName: 'CareerBoost',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerBoost - AI-Powered Career Assistant',
    description: 'Get personalized career guidance and resume analysis',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AMP Auto-Ads for mobile optimization */}
        <AMPAutoAds enabled={process.env.NODE_ENV === 'production'} />
        
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
          <ChatBot />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              },
            }}
          />
        </main>
      </body>
    </html>
  )
}
