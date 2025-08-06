/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Remove the env section as it's not needed for server-side environment variables
  // Environment variables starting with NEXT_PUBLIC_ are automatically available in the browser
  // Server-side variables like GEMINI_API_KEY should be accessed via process.env directly
  webpack: (config, { isServer }) => {
    // Handle pdfjs-dist in client-side builds
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      };
    }
    
    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://pagead2.googlesyndication.com https://www.googletagservices.com https://cdn.ampproject.org https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              "worker-src 'self' blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net",
              "connect-src 'self' https://generativelanguage.googleapis.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
              "frame-src 'self' https://googleads.g.doubleclick.net https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
