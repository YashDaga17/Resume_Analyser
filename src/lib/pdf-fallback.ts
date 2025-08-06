// Enhanced PDF extraction utility with multiple fallback methods
// This provides robust PDF text extraction with better error handling and worker management

// Working PDF extraction using PDF.js with improved worker handling
export async function extractTextFromPDFWorking(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      reject(new Error('PDF processing timed out. The PDF may be too large or complex.'));
    }, 30000); // 30 second timeout
    
    try {
      // Import PDF.js
      const pdfjsLib = await import('pdfjs-dist');
      
      console.log('Loading PDF document...');
      const arrayBuffer = await file.arrayBuffer();
      
      // Try without worker first - more reliable in many environments
      let loadingTask;
      try {
        // Attempt 1: No worker (most compatible)
        loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          useSystemFonts: true,
          disableAutoFetch: true,
          disableStream: true,
          isEvalSupported: false,
          useWorkerFetch: false,
          verbosity: 0, // Minimize console output
        });
      } catch (e) {
        // Attempt 2: With web worker if no-worker fails
        console.log('Fallback to worker-based loading...');
        if (typeof window !== 'undefined') {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
        }
        
        loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          useSystemFonts: true,
          verbosity: 0,
        });
      }
      
      const pdf = await loadingTask.promise;
      console.log(`PDF loaded successfully. Pages: ${pdf.numPages}`);
      
      let extractedText = '';
      const maxPages = Math.min(pdf.numPages, 10); // Limit to 10 pages to prevent timeouts
      
      // Extract text from each page with improved error handling
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Extract text from all text items on the page with better filtering
          const pageText = textContent.items
            .filter((item: any) => {
              return item.str && 
                     typeof item.str === 'string' && 
                     item.str.trim().length > 0 &&
                     !item.str.match(/^[\s\n\r]+$/); // Filter out whitespace-only strings
            })
            .map((item: any) => item.str.trim())
            .join(' ');
          
          if (pageText.trim().length > 0) {
            extractedText += pageText + '\n';
          }
          
          console.log(`Page ${pageNum}: extracted ${pageText.length} characters`);
        } catch (pageError) {
          console.warn(`Error extracting page ${pageNum}:`, pageError);
          // Continue with other pages - don't fail the entire process
        }
      }
      
      if (pdf.numPages > maxPages) {
        console.log(`Note: Only processed first ${maxPages} pages of ${pdf.numPages} total pages`);
      }
      
      extractedText = extractedText.trim();
      console.log(`Total extracted: ${extractedText.length} characters`);
      
      clearTimeout(timeout);
      
      if (extractedText.length < 50) {
        reject(new Error("This PDF appears to contain mostly images or unreadable text. Please try:\n• A text-based PDF (not scanned)\n• Converting to Word document (.docx)\n• Copy-paste text directly"));
        return;
      }
      
      resolve(extractedText);
      
    } catch (error) {
      clearTimeout(timeout);
      console.error('PDF.js extraction failed:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid PDF')) {
          reject(new Error("Invalid PDF file. Please check the file and try again."));
        } else if (error.message.includes('password')) {
          reject(new Error("This PDF is password protected. Please remove the password and try again."));
        } else if (error.message.includes('images')) {
          reject(error); // Re-throw our custom message
        } else if (error.message.includes('worker') || error.message.includes('Worker')) {
          // This is the common issue - fallback to simple extraction
          reject(new Error("WORKER_ERROR"));
        } else if (error.message.includes('timeout')) {
          reject(error);
        }
      }
      
      // For any other PDF.js errors, indicate we should try the fallback
      reject(new Error("PDFJS_ERROR"));
    }
  });
}

// Simple text extraction from PDF bytes (enhanced approach)
function extractTextFromUint8Array(uint8Array: Uint8Array): string {
  let text = '';
  
  // Convert to string with better error handling
  try {
    // Process in chunks to avoid memory issues with large files
    const chunkSize = 100000; // 100KB chunks
    const maxSize = Math.min(uint8Array.length, 2000000); // Limit to 2MB for processing
    
    for (let offset = 0; offset < maxSize; offset += chunkSize) {
      const chunk = uint8Array.slice(offset, Math.min(offset + chunkSize, maxSize));
      const str = String.fromCharCode.apply(null, Array.from(chunk));
      
      // Method 1: Extract text between parentheses (PDF text objects)
      const textRegex = /\(([^)]{2,})\)/g;
      let matches;
      while ((matches = textRegex.exec(str)) !== null) {
        const textPart = matches[1]
          .replace(/\\[rn]/g, ' ') // Replace line breaks
          .replace(/\\[t]/g, ' ')  // Replace tabs
          .replace(/\\[f]/g, ' ')  // Replace form feeds
          .replace(/\\[\(\)\\]/g, '') // Remove escaped parentheses and backslashes
          .replace(/\\\d{3}/g, ' ') // Remove octal character codes
          .trim();
        
        if (textPart.length > 1 && 
            !textPart.match(/^[0-9\s.\/\\-_=+<>]+$/) && // Not just numbers and symbols
            textPart.match(/[a-zA-Z]/)) { // Contains at least one letter
          text += textPart + ' ';
        }
      }
      
      // Method 2: Look for text between angle brackets (hex encoded)
      const angleRegex = /<([A-Fa-f0-9\s]+)>/g;
      while ((matches = angleRegex.exec(str)) !== null) {
        try {
          const hexText = matches[1].replace(/\s/g, '');
          if (hexText.length > 2 && hexText.length % 2 === 0) {
            let decodedText = '';
            for (let i = 0; i < hexText.length; i += 2) {
              const charCode = parseInt(hexText.substr(i, 2), 16);
              if (charCode > 31 && charCode < 127) { // Printable ASCII
                decodedText += String.fromCharCode(charCode);
              }
            }
            if (decodedText.length > 2 && 
                decodedText.match(/[a-zA-Z]/) &&
                !decodedText.match(/^[0-9\s.\/\\-_=+<>]+$/)) {
              text += decodedText + ' ';
            }
          }
        } catch (e) {
          // Ignore hex parsing errors
        }
      }
      
      // Method 3: Look for common PDF text patterns
      const patterns = [
        /BT\s*[^ET]*\((.*?)\)\s*Tj/g, // Text show operators
        /Td\s*\((.*?)\)\s*Tj/g,      // Text with displacement
        /TJ\s*\[(.*?)\]/g,           // Text arrays
      ];
      
      patterns.forEach(pattern => {
        let patternMatches;
        while ((patternMatches = pattern.exec(str)) !== null) {
          const textPart = patternMatches[1]
            .replace(/\\[rntf]/g, ' ')
            .replace(/\\\\/g, '')
            .trim();
          
          if (textPart.length > 2 && textPart.match(/[a-zA-Z]/)) {
            text += textPart + ' ';
          }
        }
      });
    }
    
  } catch (e) {
    console.warn('Error processing PDF bytes:', e);
  }
  
  // Clean up the extracted text
  let cleanedText = text
    .replace(/\s+/g, ' ')                    // Normalize whitespace
    .replace(/[^\w\s@.,;:!?'"()-]/g, ' ')    // Keep common punctuation and alphanumeric
    .replace(/(.)\1{4,}/g, '$1')             // Remove excessive character repetition
    .trim();
  
  // Remove very short "words" that are likely artifacts
  cleanedText = cleanedText
    .split(' ')
    .filter(word => word.length > 1 || /[a-zA-Z]/.test(word))
    .join(' ');
  
  return cleanedText;
}

// Simple PDF extraction using raw bytes
export async function extractTextFromPDFSimple(file: File): Promise<string> {
  try {
    console.log('Attempting simple PDF text extraction...');
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    const extractedText = extractTextFromUint8Array(uint8Array);
    
    if (extractedText.length < 30) {
      throw new Error("Simple extraction found minimal text. This PDF may contain images or use complex encoding.");
    }
    
    console.log(`Simple extraction successful: ${extractedText.length} characters`);
    return extractedText;
  } catch (error) {
    console.error('Simple PDF extraction failed:', error);
    throw error;
  }
}

// Main extraction function with comprehensive fallback strategy
export async function extractTextFromFileWithFallback(file: File): Promise<string> {
  console.log(`Starting text extraction for: ${file.name} (${file.type})`);
  
  if (file.type === "application/pdf") {
    console.log('Processing PDF file with robust fallback strategy...');
    
    // For PDFs, try simple extraction first (more reliable), then PDF.js if needed
    try {
      // First attempt: Simple byte extraction (most compatible)
      console.log('Attempting simple byte extraction (most reliable method)...');
      const extractedText = await extractTextFromPDFSimple(file);
      
      if (extractedText && extractedText.length >= 50) {
        console.log(`Simple extraction successful: ${extractedText.length} characters`);
        return extractedText;
      } else {
        console.log('Simple extraction found minimal text, trying PDF.js...');
        throw new Error('MINIMAL_TEXT_FOUND');
      }
    } catch (simpleError) {
      console.warn('Simple extraction failed or found minimal text:', simpleError);
      
      // Second attempt: Use PDF.js (more accurate but less reliable)
      try {
        console.log('Attempting PDF.js extraction...');
        return await extractTextFromPDFWorking(file);
      } catch (pdfJsError) {
        console.error('PDF.js extraction also failed:', pdfJsError);
        
        // Final fallback: Provide helpful error message with the best available info
        const simpleErrorMsg = simpleError instanceof Error ? simpleError.message : '';
        const pdfJsErrorMsg = pdfJsError instanceof Error ? pdfJsError.message : '';
        
        throw new Error(`PDF text extraction failed using multiple methods.

🔍 **What we tried:**
• Simple text extraction: ${simpleErrorMsg ? 'Found minimal text' : 'Failed'}
• Advanced PDF.js extraction: Failed

🚀 **Quick Solutions:**
1. **Copy & Paste Method** (Most Reliable):
   • Open your PDF in any PDF viewer
   • Select all text (Ctrl+A or Cmd+A)
   • Copy and paste into a new .txt file
   • Upload the .txt file

2. **Convert to Word Document**:
   • Save/export your PDF as .docx format
   • Upload the .docx file instead

3. **Create Text-Based PDF**:
   • Open your resume in Word or Google Docs
   • Use "Save as PDF" or "Print to PDF"
   • This creates a more compatible PDF

📋 **Alternative Formats We Support:**
• Word documents (.docx, .doc)
• Plain text files (.txt)
• Rich text format (.rtf)

💡 **Common Causes:**
• PDF contains scanned images (not selectable text)
• Complex fonts or encoding issues
• Password protection or file corruption

Technical details: ${pdfJsErrorMsg || 'Multiple extraction methods failed'}`);
      }
    }
  } else if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/msword"
  ) {
    // Handle Word documents
    try {
      console.log('Processing Word document...');
      const mammoth = await import("mammoth");
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      const extractedText = result.value.trim();
      
      if (extractedText.length < 50) {
        throw new Error("Unable to extract sufficient text from the Word document. Please ensure the document contains readable text.");
      }
      
      console.log(`Successfully extracted ${extractedText.length} characters from Word document`);
      return extractedText;
    } catch (error) {
      console.error("Word document extraction failed:", error);
      throw new Error("Failed to extract text from Word document. Please ensure the file is not corrupted and try again.");
    }
  } else if (file.type === "text/plain") {
    // Handle text files
    try {
      console.log('Processing text file...');
      const text = await file.text();
      if (text.trim().length < 10) {
        throw new Error("The text file appears to be empty or too short.");
      }
      console.log(`Successfully extracted ${text.length} characters from text file`);
      return text.trim();
    } catch (error) {
      console.error("Text file extraction failed:", error);
      throw new Error("Failed to read text file. Please ensure the file is valid and try again.");
    }
  } else {
    throw new Error("Unsupported file type. Please upload PDF, Word (.docx), or text (.txt) files.");
  }
}
