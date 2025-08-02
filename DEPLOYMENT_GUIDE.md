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

If you want to deploy from your local machine, you have several options to install Vercel CLI:

#### Option A: Using npx (Recommended - No Installation Required)
```bash
# Deploy directly without installing
npx vercel login
npx vercel --prod
```

#### Option B: Install Vercel CLI without sudo
```bash
# Method 1: Using npm with --prefix (avoids permission issues)
npm install --prefix ~/.local vercel
export PATH="$HOME/.local/bin:$PATH"

# Method 2: Using pnpm (if you have it)
pnpm add -g vercel

# Method 3: Using yarn (if you have it)
yarn global add vercel
```

#### Option C: Using Homebrew (Recommended for macOS)
```bash
# Install using Homebrew (if you have it)
brew install vercel-cli

# Or install Homebrew first, then Vercel
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install vercel-cli
```

#### Option D: Fix npm permissions (if you prefer global npm installs)
```bash
# Create a directory for global packages
mkdir ~/.npm-global

# Configure npm to use the new directory
npm config set prefix '~/.npm-global'

# Add to your shell profile (~/.zshrc for zsh)
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Now install Vercel globally
npm install -g vercel
```

#### Deploy Commands:
```bash
# Login to Vercel
vercel login

# Deploy to production
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
