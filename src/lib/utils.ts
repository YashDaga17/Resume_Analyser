import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color utilities for score display
export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

// Calculate overall progress from analysis sections
export function calculateOverallProgress(sections: any): number {
  const scores = [
    sections.atsCompatibility?.score || 0,
    sections.skillsGaps?.score || 0,
    sections.experience?.score || 0,
    sections.grammar?.score || 0,
    sections.formatting?.score || 0
  ]
  
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
  return Math.round(average)
}

// File validation for resume uploads
export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain'
  ]

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a PDF, Word document, or text file' }
  }

  return { valid: true }
}

// Extract text content from uploaded files
export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const result = e.target?.result;

        if (file.type === "text/plain") {
          resolve(result as string);
        } else if (file.type === "application/pdf") {
          try {
            // For now, we'll use a placeholder for PDF files
            // In a production app, you'd want to implement server-side PDF parsing
            const placeholderText = `
Sample Resume Content

John Doe
Software Developer
Email: john.doe@email.com
Phone: (555) 123-4567

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2023

SKILLS
- JavaScript, Python, React
- HTML, CSS, Git
- Problem solving, Team collaboration

EXPERIENCE
Software Development Intern
Tech Company Inc. (Summer 2022)
- Developed web applications using React and Node.js
- Collaborated with team of 5 developers
- Improved application performance by 20%

PROJECTS
Portfolio Website
- Built responsive website using React and CSS
- Implemented contact form with backend integration

Note: This is placeholder text. For full PDF text extraction, upload a text file or implement server-side PDF parsing.
            `.trim();
            
            resolve(placeholderText);
          } catch (error) {
            console.error("PDF parsing error:", error);
            reject(new Error("Failed to extract text from PDF"));
          }
        } else if (
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword"
        ) {
          try {
            // Dynamic import for client-side Word document parsing
            const mammoth = await import("mammoth");
            const arrayBuffer = result as ArrayBuffer;
            const result_mammoth = await mammoth.extractRawText({ arrayBuffer });
            resolve(result_mammoth.value);
          } catch (error) {
            reject(new Error("Failed to extract text from Word document"));
          }
        } else {
          reject(new Error("Unsupported file type"));
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
