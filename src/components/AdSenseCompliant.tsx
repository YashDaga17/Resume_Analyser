'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'

interface AdSenseAdProps {
  slot: string
  style?: React.CSSProperties
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  className?: string
}

interface AdSenseContextType {
  hasSubstantialContent: boolean
  pageType: 'home' | 'analysis' | 'upload' | 'templates' | 'interview' | 'dashboard' | 'loading'
  contentLength: number
  isAdSenseReady: boolean
}

export const AdSenseContext = React.createContext<AdSenseContextType>({
  hasSubstantialContent: false,
  pageType: 'loading',
  contentLength: 0,
  isAdSenseReady: false
})

// Hook to manage AdSense compliance
export const useAdSenseCompliance = () => {
  const [hasSubstantialContent, setHasSubstantialContent] = useState(false)
  const [pageType, setPageType] = useState<AdSenseContextType['pageType']>('loading')
  const [contentLength, setContentLength] = useState(0)
  const [isAdSenseReady, setIsAdSenseReady] = useState(false)

  const updateContentContext = (
    newPageType: AdSenseContextType['pageType'], 
    newContentLength: number = 0
  ) => {
    setPageType(newPageType)
    setContentLength(newContentLength)
    
    // Define what constitutes substantial content for each page type
    const substantialContentThreshold = {
      home: 500,      // Hero + Features content
      analysis: 1000, // Detailed analysis results
      templates: 300, // Message templates
      interview: 300, // Interview questions
      dashboard: 200, // Progress data
      upload: 0,      // No ads on upload screen
      loading: 0      // No ads on loading screen
    }

    const threshold = substantialContentThreshold[newPageType] || 0
    setHasSubstantialContent(newContentLength >= threshold && newPageType !== 'upload' && newPageType !== 'loading')
  }

  return {
    hasSubstantialContent,
    pageType,
    contentLength,
    isAdSenseReady,
    setIsAdSenseReady,
    updateContentContext
  }
}

// AdSense Script Component - only loads when appropriate
export const AdSenseScript = ({ onLoad }: { onLoad: () => void }) => {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7701180604741961'
  
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={onLoad}
      onError={(e) => {
        console.warn('AdSense script failed to load:', e)
      }}
    />
  )
}

// Compliant Ad Component
export const AdSenseAd = ({ 
  slot, 
  style = { display: 'block' }, 
  format = 'auto',
  responsive = true,
  className = ''
}: AdSenseAdProps) => {
  const [adLoaded, setAdLoaded] = useState(false)
  const { hasSubstantialContent, pageType, isAdSenseReady } = React.useContext(AdSenseContext)
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7701180604741961'

  useEffect(() => {
    // Only load ads if:
    // 1. AdSense script is ready
    // 2. Page has substantial content
    // 3. Page is not upload or loading type
    // 4. Ad hasn't been loaded yet
    if (isAdSenseReady && hasSubstantialContent && !adLoaded && 
        pageType !== 'upload' && pageType !== 'loading') {
      try {
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({})
          setAdLoaded(true)
        }
      } catch (error) {
        console.warn('AdSense ad failed to load:', error)
      }
    }
  }, [isAdSenseReady, hasSubstantialContent, adLoaded, pageType])

  // Don't render ad if conditions aren't met
  if (!hasSubstantialContent || pageType === 'upload' || pageType === 'loading' || !isAdSenseReady) {
    return null
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

// Content-aware ad placements
export const ContentAwareAds = () => {
  const { hasSubstantialContent, pageType } = React.useContext(AdSenseContext)

  if (!hasSubstantialContent) {
    return null
  }

  // Your real AdSense ad slot ID
  const realAdSlot = "4303950704"

  return (
    <>
      {/* Header Banner - only on content-rich pages */}
      {(pageType === 'home' || pageType === 'analysis') && (
        <div className="w-full flex justify-center py-4 px-4">
          <div className="w-full max-w-4xl">
            {/* Desktop Banner */}
            <div className="hidden md:block">
              <AdSenseAd
                slot={realAdSlot}
                style={{ display: 'block' }}
                format="auto"
                responsive={true}
                className="w-full max-w-full overflow-hidden"
              />
            </div>
            {/* Mobile Banner */}
            <div className="block md:hidden">
              <AdSenseAd
                slot={realAdSlot}
                style={{ display: 'block' }}
                format="auto"
                responsive={true}
                className="w-full max-w-full overflow-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* In-content Ad - only if we're on analysis page */}
      {pageType === 'analysis' && (
        <div className="w-full flex justify-center py-8 px-4">
          <div className="w-full max-w-2xl">
            <AdSenseAd
              slot={realAdSlot}
              style={{ display: 'block' }}
              format="auto"
              responsive={true}
              className="w-full max-w-full overflow-hidden"
            />
          </div>
        </div>
      )}
    </>
  )
}
