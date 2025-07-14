import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { WordPressPost } from "./type"

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
 * Extract the first image URL from HTML content
 * @param html - The HTML content to search for images
 * @returns The URL of the first image found, or null if none found
 */
export function extractFirstImageFromContent(html: string): string | null {
  if (!html) return null;
  
  // Try to find img tags with src attribute
  const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/i;
  const match = html.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return null;
}

/**
 * Get the post image URL with fallback logic
 * @param post - The WordPress post object
 * @param fallbackImage - The fallback image URL if no image is found
 * @returns The URL of the post image
 */
export function getPostImageUrl(post: WordPressPost, fallbackImage: string = "/home-n.png"): string {
  // First try to get featured media
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (featuredImage) {
    return featuredImage;
  }

  // If no featured image, try to extract from content
  const contentImage = extractFirstImageFromContent(post.content.rendered);
  if (contentImage) {
    return contentImage;
  }

  // Fallback to default image
  return fallbackImage;
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
  let processedHtml = html;
  let counter = 0;
  
  // First, handle WordPress file blocks (.wp-block-file)
  const fileBlockRegex = /<div[^>]*class="[^"]*wp-block-file[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let fileBlockMatch;
  
  while ((fileBlockMatch = fileBlockRegex.exec(html)) !== null) {
    const [fullFileBlock, fileBlockContent] = fileBlockMatch;
    
    // Extract PDF URL from the file block
    const pdfUrlMatch = fileBlockContent.match(/href="([^"]*\.pdf)"/i);
    if (pdfUrlMatch) {
      const pdfUrl = pdfUrlMatch[1];
      const pdfId = `pdf-viewer-${counter++}`;
      
      // Extract title from the file block - try to get filename or link text
      let title = 'PDF Document';
      
      // Try to get filename from URL
      const urlParts = pdfUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      if (filename && filename.includes('.pdf')) {
        title = filename.replace('.pdf', '');
      }
      
      // Or try to get text from non-button link
      const linkTextMatch = fileBlockContent.match(/<a[^>]*href="[^"]*\.pdf"[^>]*(?!class="[^"]*wp-block-file__button[^"]*")[^>]*>([^<]+)<\/a>/i);
      if (linkTextMatch && linkTextMatch[1]) {
        title = linkTextMatch[1].trim();
      }
      
      // Store PDF info
      pdfUrls.push({
        url: pdfUrl,
        title: title,
        id: pdfId
      });
      
      // Replace the entire file block with a placeholder
      const placeholder = `<div class="pdf-placeholder" data-pdf-id="${pdfId}" data-pdf-url="${pdfUrl}" data-pdf-title="${title}"></div>`;
      processedHtml = processedHtml.replace(fullFileBlock, placeholder);
    }
  }
  
  // Then handle regular PDF links (that are not already processed)
  const pdfLinkRegex = /<a[^>]*href="([^"]*\.pdf)"[^>]*>(.*?)<\/a>/gi;
  let pdfLinkMatch;
  
  while ((pdfLinkMatch = pdfLinkRegex.exec(processedHtml)) !== null) {
    const [fullMatch, pdfUrl, linkText] = pdfLinkMatch;
    
    // Skip if this link is already processed (part of a file block that was replaced)
    if (processedHtml.includes(fullMatch)) {
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
  }
  
  return {
    processedHtml,
    pdfUrls
  };
}
