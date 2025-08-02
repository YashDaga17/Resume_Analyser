# CareerBoost - AI-Powered Career Assistant

A comprehensive web platform designed specifically for students and young professionals to enhance their job search and career development journey.

## 🚀 Features

- **AI Resume Analysis**: Upload your resume for instant feedback on ATS compatibility, skills gaps, and improvement suggestions
- **24/7 AI Chatbot**: Get personalized career guidance and support anytime
- **Interview Preparation**: Practice with AI-generated questions and receive instant feedback
- **Message Templates**: Professional templates for recruiter outreach and networking
- **Progress Dashboard**: Track your career development with achievements and analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI
- **Animations**: Framer Motion
- **File Handling**: React Dropzone
- **Package Manager**: pnpm

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Resume_Analyser
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your `.env.local` file

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Add your environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key

### Manual Deployment Steps

1. Build the project:
   ```bash
   pnpm build
   ```

2. The build output will be in the `.next` folder

## 📁 Project Structure

```
src/
├── app/                 # Next.js 13+ app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── ResumeUpload.tsx
│   ├── AnalysisResults.tsx
│   ├── ChatBot.tsx
│   └── ...
├── lib/               # Utility functions
│   ├── gemini.ts      # Gemini AI service
│   └── utils.ts       # Helper functions
└── types/             # TypeScript type definitions
    └── index.ts
```

## 🎯 Current Status

✅ **Completed Features:**
- Basic project setup with Next.js + TypeScript
- Beautiful, responsive UI with Tailwind CSS
- Hero section with animated elements
- Features overview page
- Resume upload interface with drag & drop
- AI-powered chatbot with Gemini integration
- Resume analysis results display
- Navigation between different sections

🚧 **In Development:**
- Message templates functionality
- Interview preparation system
- Progress dashboard with analytics
- User authentication
- Database integration for storing user data

## 🔄 Next Development Steps

1. **Enhance Resume Analysis**: Improve PDF/DOCX parsing
2. **Build Message Templates**: Create customizable professional templates
3. **Develop Interview Prep**: Add mock interview system
4. **Add User Accounts**: Implement authentication and user profiles
5. **Create Dashboard**: Build progress tracking and analytics

## 🤝 Contributing

This is a learning project! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share feedback

## 📄 License

This project is for educational purposes. Please ensure you have proper API keys and comply with Google's usage terms.

## 🎓 Learning Journey

This project is built as a learning experience to understand:
- Modern React development with Next.js
- TypeScript integration
- AI API integration
- Modern UI/UX design principles
- Deployment strategies

Happy coding! 🚀
