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
    },
    flawAnalysis: {
      score: 65,
      buzzwords: {
        overused: ["Problem solving", "Analytical skills", "Team collaboration", "Collaborative development", "Detail-oriented", "Self-motivated"],
        suggestions: ["Data-driven analysis", "Cross-functional partnerships", "Innovative solutions", "Strategic problem-solving", "Results-oriented approach", "Initiative-driven"]
      },
      weakAreas: [
        {
          area: "Skills",
          issue: "Skills are listed but not quantified or demonstrated through examples.",
          improvement: "Provide specific examples of how you used each skill in a project or experience."
        },
        {
          area: "Experience", 
          issue: "Descriptions are duty-based rather than achievement-based.",
          improvement: "Focus on what you accomplished and the impact you made, using action verbs and quantifiable results."
        },
        {
          area: "Professional Summary",
          issue: "Missing or generic professional summary that doesn't grab attention.",
          improvement: "Create a compelling 3-line summary highlighting your unique value proposition and key achievements."
        }
      ],
      missingMetrics: [
        "Include percentage improvements (e.g., 'Improved system efficiency by 25%')",
        "Mention the number of users impacted, lines of code written, or features developed",
        "Add timeline metrics (e.g., 'Delivered project 2 weeks ahead of schedule')",
        "Include budget or resource management figures"
      ],
      structuralIssues: [
        "Inconsistent formatting between sections",
        "Missing contact information or LinkedIn profile",
        "Weak section headers that don't stand out",
        "No clear hierarchy of information"
      ],
      honestFeedback: [
        "Brutal Honest Feedback: Areas that need immediate attention from a recruiter's perspective",
        "Resume is a good starting point but needs more substance to stand out. Focus on quantifying your accomplishments and showcasing your skills through specific examples. The lack of a professional summary is a missed opportunity to immediately grab the recruiter's attention.",
        "Current experience descriptions read like job duties rather than achievements - this won't help you stand out in a competitive market.",
        "Skills section needs work - simply listing technologies without context doesn't demonstrate proficiency or impact."
      ]
    },
    impactRewrite: {
      score: 60,
      currentIssues: [
        "Uses passive language instead of action verbs",
        "Focuses on responsibilities rather than achievements",
        "Missing quantifiable results and metrics",
        "Lacks specific examples of impact"
      ],
      rewriteSuggestions: [
        {
          original: "Responsible for managing social media accounts",
          improved: "Grew social media engagement by 45% across 3 platforms, reaching 10K+ followers through strategic content planning",
          reasoning: "Shows specific results with numbers and demonstrates strategic thinking rather than just task completion"
        },
        {
          original: "Worked on a team project to develop a web application",
          improved: "Collaborated with 4 developers to build a responsive e-commerce platform, reducing load time by 30% and increasing user conversion by 15%",
          reasoning: "Highlights teamwork, technical skills, and measurable business impact"
        },
        {
          original: "Helped customers with their inquiries",
          improved: "Resolved 95% of customer inquiries on first contact, maintaining 4.8/5 customer satisfaction rating across 200+ interactions",
          reasoning: "Transforms generic customer service into specific performance metrics that demonstrate excellence"
        }
      ],
      actionVerbSuggestions: [
        "Accelerated", "Achieved", "Delivered", "Optimized", "Streamlined", 
        "Implemented", "Generated", "Increased", "Reduced", "Transformed"
      ],
      quantificationTips: [
        "Add percentages for improvements or growth",
        "Include dollar amounts for budgets or cost savings",
        "Specify timeframes for project completion",
        "Mention team sizes and scope of responsibility",
        "Use metrics like customer satisfaction scores or performance ratings"
      ],
      achievementHighlights: [
        "Focus on results that directly impacted business goals",
        "Highlight problems you solved and their outcomes",
        "Showcase instances where you exceeded expectations",
        "Demonstrate leadership or initiative taken"
      ]
    },
    professionalSummary: {
      score: 55,
      currentSummary: "Recent graduate with a degree in Computer Science. Hard worker and team player looking for opportunities to grow.",
      hookStrength: 40,
      suggestedSummary: "Full-stack developer with expertise in React and Node.js, proven track record of building user-centric applications that increase engagement by 40%. Passionate about creating efficient, scalable solutions and collaborating with cross-functional teams to deliver high-impact projects.",
      impactKeywords: ["Full-stack developer", "proven track record", "user-centric", "increase engagement", "efficient solutions"],
      improvements: [
        "Lead with your strongest skill or achievement",
        "Include specific technologies and measurable outcomes", 
        "Show personality and passion for your field",
        "End with what value you bring to employers"
      ],
      personalBranding: [
        "Position yourself as a problem-solver, not just a job seeker",
        "Highlight what makes you unique in your field",
        "Use industry-specific keywords that align with target roles"
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
  ],
  careerRoadmap: {
    currentLevel: "entry",
    targetRoles: ["Frontend Developer", "Full-Stack Developer", "Software Engineer"],
    skillProgression: [
      {
        role: "Frontend Developer",
        requiredSkills: ["React", "JavaScript ES6+", "CSS3", "HTML5", "Git", "Responsive Design"],
        timeToAchieve: "3-6 months",
        learningPath: [
          "Complete advanced JavaScript course",
          "Master React fundamentals and hooks",
          "Build 3-4 portfolio projects",
          "Learn modern CSS frameworks (Tailwind/Bootstrap)",
          "Practice with version control (Git/GitHub)"
        ]
      },
      {
        role: "Full-Stack Developer", 
        requiredSkills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication", "Testing"],
        timeToAchieve: "6-12 months",
        learningPath: [
          "Learn backend development with Node.js",
          "Master database design and management",
          "Build full-stack applications",
          "Implement user authentication and security",
          "Learn testing frameworks and practices"
        ]
      },
      {
        role: "Software Engineer",
        requiredSkills: ["System Design", "Data Structures", "Algorithms", "Cloud Services", "DevOps"],
        timeToAchieve: "12-18 months", 
        learningPath: [
          "Study data structures and algorithms",
          "Learn system design principles",
          "Gain experience with cloud platforms (AWS/Azure)",
          "Understand CI/CD and DevOps practices",
          "Contribute to open-source projects"
        ]
      }
    ],
    industryTrends: [
      "AI/ML integration in web development",
      "Serverless architecture adoption",
      "JAMstack and static site generators",
      "Progressive Web Apps (PWAs)",
      "Micro-frontends architecture",
      "Web3 and blockchain integration"
    ],
    certificationRecommendations: [
      "AWS Certified Developer - Associate",
      "Google Professional Cloud Developer",
      "Microsoft Azure Developer Associate",
      "MongoDB Certified Developer",
      "React Developer Certification"
    ]
  },
  skillsGapTable: [
    {
      role: "Frontend Developer",
      industry: "Technology",
      requiredSkills: [
        {
          skill: "React",
          importance: "Critical",
          currentLevel: "Beginner",
          gap: "High",
          learningResources: ["Official React Docs", "React.dev tutorial", "Frontend Masters React Course"],
          timeToLearn: "2-3 months"
        },
        {
          skill: "JavaScript ES6+",
          importance: "Critical", 
          currentLevel: "Intermediate",
          gap: "Medium",
          learningResources: ["MDN JavaScript Guide", "JavaScript.info", "ES6 Features Course"],
          timeToLearn: "1-2 months"
        },
        {
          skill: "CSS3 & Responsive Design",
          importance: "Important",
          currentLevel: "Intermediate",
          gap: "Low", 
          learningResources: ["CSS Grid & Flexbox courses", "Responsive design patterns"],
          timeToLearn: "3-4 weeks"
        },
        {
          skill: "TypeScript",
          importance: "Important",
          currentLevel: "None",
          gap: "High",
          learningResources: ["TypeScript Handbook", "TypeScript in React course"],
          timeToLearn: "1-2 months"
        },
        {
          skill: "Testing (Jest/React Testing Library)",
          importance: "Important",
          currentLevel: "None", 
          gap: "High",
          learningResources: ["Jest documentation", "React Testing Library guides"],
          timeToLearn: "3-4 weeks"
        },
        {
          skill: "Webpack/Build Tools",
          importance: "Nice to Have",
          currentLevel: "Beginner",
          gap: "Medium",
          learningResources: ["Webpack guides", "Vite documentation"],
          timeToLearn: "2-3 weeks"
        }
      ],
      overallMatch: 65
    },
    {
      role: "Full-Stack Developer",
      industry: "Technology", 
      requiredSkills: [
        {
          skill: "Node.js",
          importance: "Critical",
          currentLevel: "None",
          gap: "High",
          learningResources: ["Node.js documentation", "Node.js Complete Course", "Express.js guides"],
          timeToLearn: "2-3 months"
        },
        {
          skill: "Database Management (SQL/NoSQL)",
          importance: "Critical",
          currentLevel: "Beginner", 
          gap: "High",
          learningResources: ["MongoDB University", "PostgreSQL Tutorial", "Database Design Course"],
          timeToLearn: "2-3 months"
        },
        {
          skill: "REST API Development",
          importance: "Critical",
          currentLevel: "None",
          gap: "High", 
          learningResources: ["REST API Design", "API Development with Express", "Postman tutorials"],
          timeToLearn: "1-2 months"
        },
        {
          skill: "Authentication & Security",
          importance: "Important",
          currentLevel: "None",
          gap: "High",
          learningResources: ["JWT Authentication guides", "OAuth 2.0 tutorials", "Web Security courses"],
          timeToLearn: "1-2 months"
        },
        {
          skill: "Cloud Services (AWS/Azure)",
          importance: "Important", 
          currentLevel: "None",
          gap: "High",
          learningResources: ["AWS Documentation", "Azure Learning Path", "Cloud Computing courses"],
          timeToLearn: "2-4 months"
        }
      ],
      overallMatch: 45
    }
  ]
}
