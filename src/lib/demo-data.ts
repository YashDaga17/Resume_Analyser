import type { ResumeAnalysis } from '@/types'

export const demoAnalysis: ResumeAnalysis = {
  fileName: "demo-resume.pdf",
  analysisId: "demo-analysis-123",
  timestamp: new Date(),
  overallScore: 78,
  sections: {
    atsCompatibility: {
      score: 75,
      issues: [
        "Missing keywords for your target role",
        "Some formatting may not be ATS-friendly",
        "Contact information could be clearer"
      ],
      improvements: [
        "Add relevant technical keywords",
        "Use standard section headings",
        "Include phone number and LinkedIn profile"
      ],
      keywords: {
        missing: ["JavaScript", "React", "Node.js", "API integration"],
        present: ["HTML", "CSS", "Git", "Problem solving"],
        suggested: ["Frontend development", "Web development", "Responsive design"]
      }
    },
    skillsGaps: {
      score: 72,
      technical: {
        present: ["HTML", "CSS", "Git", "Python"],
        missing: ["JavaScript frameworks", "Database management", "Cloud platforms"],
        trending: ["React", "TypeScript", "Docker", "AWS"]
      },
      soft: {
        present: ["Team collaboration", "Problem solving"],
        missing: ["Leadership", "Project management", "Communication"],
        important: ["Adaptability", "Critical thinking", "Time management"]
      },
      recommendations: [
        "Learn modern JavaScript frameworks like React or Vue",
        "Gain experience with databases (SQL, MongoDB)",
        "Develop leadership skills through group projects"
      ]
    },
    experience: {
      score: 68,
      level: "entry",
      strengths: [
        "Academic projects show practical application",
        "Internship experience is valuable",
        "Shows continuous learning"
      ],
      gaps: [
        "Limited professional experience",
        "Need more diverse project portfolio",
        "Missing quantifiable achievements"
      ],
      suggestions: [
        "Add metrics to your achievements (e.g., improved performance by 20%)",
        "Include relevant coursework and projects",
        "Highlight transferable skills from part-time work"
      ],
      projectIdeas: [
        "Build a full-stack web application",
        "Contribute to open-source projects",
        "Create a portfolio website"
      ]
    },
    grammar: {
      score: 85,
      errors: [
        {
          type: "grammar",
          text: "Responsible for managing social media accounts",
          suggestion: "Managed social media accounts, increasing engagement by X%"
        }
      ],
      improvements: [
        "Use more action verbs to start bullet points",
        "Ensure consistent tense throughout"
      ]
    },
    formatting: {
      score: 80,
      issues: [
        "Inconsistent spacing between sections",
        "Font sizes could be more uniform"
      ],
      positives: [
        "Clean, professional layout",
        "Good use of white space",
        "Easy to read fonts"
      ],
      suggestions: [
        "Use consistent margins throughout",
        "Consider using bullet points for better readability"
      ]
    }
  },
  recommendations: [
    {
      id: "rec-1",
      category: "skills",
      priority: "high",
      title: "Learn JavaScript Frameworks",
      description: "Modern web development heavily relies on JavaScript frameworks. Learning React or Vue.js will significantly improve your job prospects.",
      actionable: "Complete a React.js course and build 2-3 projects using the framework",
      timeEstimate: "4-6 weeks"
    },
    {
      id: "rec-2",
      category: "experience",
      priority: "medium",
      title: "Quantify Your Achievements",
      description: "Adding specific metrics and numbers to your accomplishments makes your resume much more compelling to employers.",
      actionable: "Review each bullet point and add measurable outcomes where possible",
      timeEstimate: "2-3 hours"
    }
  ],
  nextSteps: [
    "Update your resume with suggested keywords",
    "Start learning React.js or another modern framework",
    "Build a portfolio project showcasing your skills",
    "Apply the formatting improvements suggested"
  ]
}
