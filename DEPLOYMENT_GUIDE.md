# Deployment Guide for Resume Analyser

## Vercel Deployment Setup

### 1. Environment Variables Setup

You need to add the following environment variables in your Vercel project dashboard:

#### Required Environment Variables:

1. **GEMINI_API_KEY**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini
   - Copy the API key

#### How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `resume-analyser-c6ky`
3. Go to **Settings** tab
4. Click on **Environment Variables** in the sidebar
5. Add the following variables:

   ```
   Name: GEMINI_API_KEY
   Value: [Your Gemini API Key]
   Environments: Production, Preview, Development
   ```

6. Click **Save**

### 2. Redeploy Your Application

After adding the environment variables:

1. Go to the **Deployments** tab in your Vercel dashboard
2. Click on the three dots (...) next to your latest deployment
3. Select **Redeploy**
4. Wait for the deployment to complete

### 3. Alternative: Deploy from Local

If you want to deploy from your local machine:

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Local Development Setup

For local development, create a `.env.local` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Then edit `.env.local` and add your actual API key:

```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 5. Verification

After redeployment, your application should work at:
- https://resume-analyser-c6ky.vercel.app/

### Common Issues:

1. **404 Error**: Usually means environment variables are missing
2. **API Errors**: Check if Gemini API key is valid and has proper permissions
3. **Build Failures**: Check the build logs in Vercel dashboard

### Security Note:

- Never commit actual API keys to your repository
- Always use environment variables for sensitive data
- The `GEMINI_API_KEY` should only be accessible on the server-side (not prefixed with `NEXT_PUBLIC_`)
