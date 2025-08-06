/**
 * Google OAuth Configuration - Security Optimized
 * 
 * All sensitive credentials are now stored in environment variables for better security:
 * - Prevents accidental exposure in version control
 * - Allows different values for development/production
 * - Follows security best practices
 * 
 * For potential future features like Google Drive integration, 
 * Google Sheets export, or Google Analytics
 */

// Validate required environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.warn(`Warning: Missing Google OAuth environment variables: ${missingVars.join(', ')}`);
  console.warn('Google OAuth features will not work properly. Please check your .env.local file.');
}

export const googleOAuthConfig = {
  web: {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    project_id: process.env.GOOGLE_PROJECT_ID!,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    javascript_origins: [
      process.env.NEXT_PUBLIC_APP_URL || "https://your-domain-here.vercel.app",
      "http://localhost:3000" // For development
    ]
  }
}

/**
 * Google API Scopes for potential features:
 * - Drive: For saving resumes to Google Drive
 * - Sheets: For exporting analysis data
 * - Analytics: For tracking user engagement
 */
export const googleScopes = {
  drive: ['https://www.googleapis.com/auth/drive.file'],
  sheets: ['https://www.googleapis.com/auth/spreadsheets'],
  analytics: ['https://www.googleapis.com/auth/analytics.readonly']
}

/**
 * Helper function to get OAuth client configuration
 */
export const getGoogleOAuthClient = () => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID environment variable is required');
  }

  return {
    clientId: googleOAuthConfig.web.client_id,
    redirectUri: googleOAuthConfig.web.javascript_origins[0],
    scope: googleScopes.drive.join(' ') // Default to drive scope
  }
}

export default googleOAuthConfig
