'use client'

import Script from 'next/script'

interface AMPAutoAdsProps {
  enabled?: boolean
}

/**
 * AMP Auto-Ads Component
 * Provides automatic ad placement optimization for mobile devices
 * Only loads when enabled and on appropriate pages
 */
export const AMPAutoAds = ({ enabled = false }: AMPAutoAdsProps) => {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7701180604741961'

  if (!enabled) {
    return null
  }

  return (
    <>
      {/* AMP Auto-Ads Script */}
      <Script
        async
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        strategy="afterInteractive"
      />
      
      {/* AMP Auto-Ads Configuration - using dangerouslySetInnerHTML for custom elements */}
      <div 
        dangerouslySetInnerHTML={{
          __html: `<amp-auto-ads type="adsense" data-ad-client="${clientId}"></amp-auto-ads>`
        }}
      />
    </>
  )
}

export default AMPAutoAds
