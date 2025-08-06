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
  console.log(`Starting text extraction for: ${file.name} (${file.type}, ${formatFileSize(file.size)})`);
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const result = e.target?.result;

        if (file.type === "text/plain") {
          const textContent = result as string;
          if (textContent.trim().length < 10) {
            reject(new Error("The text file appears to be empty or too short."));
            return;
          }
          console.log(`Successfully extracted ${textContent.length} characters from text file`);
          resolve(textContent.trim());
        } else if (file.type === "application/pdf") {
          try {
            // Use the enhanced fallback extraction - dynamic import to avoid circular dependencies
            const { extractTextFromFileWithFallback } = await import('./pdf-fallback');
            const extractedText = await extractTextFromFileWithFallback(file);
            console.log(`Successfully extracted ${extractedText.length} characters from PDF`);
            resolve(extractedText);
          } catch (error) {
            console.error("PDF parsing error:", error);
            if (error instanceof Error) {
              reject(error);
            } else {
              reject(new Error("PDF processing failed. Please try uploading a Word document (.docx) instead."));
            }
          }
        } else if (
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/msword"
        ) {
          try {
            console.log('Processing Word document...');
            // Dynamic import for client-side Word document parsing
            const mammoth = await import("mammoth");
            const arrayBuffer = result as ArrayBuffer;
            const result_mammoth = await mammoth.extractRawText({ arrayBuffer });
            
            const extractedText = result_mammoth.value.trim();
            
            if (extractedText.length < 50) {
              reject(new Error("Unable to extract sufficient text from the Word document. Please ensure the document contains readable text."));
              return;
            }
            
            console.log(`Successfully extracted ${extractedText.length} characters from Word document`);
            resolve(extractedText);
          } catch (error) {
            console.error("Word document parsing error:", error);
            reject(new Error("Failed to extract text from Word document. Please ensure the file is not corrupted and try again."));
          }
        } else {
          reject(new Error("Unsupported file type. Please upload PDF, Word (.docx), or text (.txt) files."));
        }
      } catch (error) {
        console.error("File processing error:", error);
        reject(error instanceof Error ? error : new Error("Unknown error occurred while processing the file."));
      }
    };

    reader.onerror = () => {
      console.error("File reader error");
      reject(new Error("Failed to read the uploaded file. Please try again."));
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
