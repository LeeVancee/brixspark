import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Decode HTML entities in text
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// Format date to display format like "02 Jul"
export function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en", { month: "short" });
  return { day, month };
}

/**
 * Process HTML content to replace PDF links with PDF viewer components
 * @param html - The HTML content from WordPress
 * @returns Object containing processed HTML and PDF URLs found
 */
export function processPDFLinks(html: string): {
  processedHtml: string;
  pdfUrls: Array<{ url: string; title: string; id: string }>;
} {
  const pdfUrls: Array<{ url: string; title: string; id: string }> = [];
  
  // Regular expression to match PDF links
  const pdfLinkRegex = /<a[^>]*href="([^"]*\.pdf)"[^>]*>(.*?)<\/a>/gi;
  
  let processedHtml = html;
  let match;
  let counter = 0;
  
  while ((match = pdfLinkRegex.exec(html)) !== null) {
    const [fullMatch, pdfUrl, linkText] = match;
    const pdfId = `pdf-viewer-${counter++}`;
    
    // Store PDF info
    pdfUrls.push({
      url: pdfUrl,
      title: linkText.replace(/<[^>]*>/g, ''), // Remove HTML tags from title
      id: pdfId
    });
    
    // Replace the PDF link with a placeholder div
    const placeholder = `<div class="pdf-placeholder" data-pdf-id="${pdfId}" data-pdf-url="${pdfUrl}" data-pdf-title="${linkText.replace(/<[^>]*>/g, '')}"></div>`;
    processedHtml = processedHtml.replace(fullMatch, placeholder);
  }
  
  return {
    processedHtml,
    pdfUrls
  };
}
