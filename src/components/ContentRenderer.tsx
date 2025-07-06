"use client";

import React, { useEffect, useRef } from "react";
import { processPDFLinks } from "@/lib/utils";
import PDFViewer from "./PDFViewer";
import { Prose } from "./craft";

interface ContentRendererProps {
  content: string;
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Process the content to find PDF links
    const { processedHtml, pdfUrls } = processPDFLinks(content);

    // Set the processed HTML
    containerRef.current.innerHTML = processedHtml;

    // Replace PDF placeholders with actual PDF viewer components
    pdfUrls.forEach(({ url, title, id }) => {
      const placeholder = containerRef.current?.querySelector(
        `[data-pdf-id="${id}"]`
      );
      if (placeholder) {
        // Create a container for the React component
        const reactContainer = document.createElement("div");
        placeholder.parentNode?.replaceChild(reactContainer, placeholder);

        // Render the PDF viewer component
        import("react-dom/client").then(({ createRoot }) => {
          const root = createRoot(reactContainer);
          root.render(<PDFViewer url={url} title={title} className="my-6" />);
        });
      }
    });

    // Handle responsive video embeds
    const handleResponsiveVideos = () => {
      // Find all iframes (YouTube, Vimeo, etc.)
      const iframes = containerRef.current?.querySelectorAll("iframe");

      iframes?.forEach((iframe) => {
        const src = iframe.src || "";

        // Check if it's a video embed
        const isVideoEmbed =
          src.includes("youtube.com") ||
          src.includes("youtu.be") ||
          src.includes("vimeo.com") ||
          src.includes("dailymotion.com") ||
          src.includes("video") ||
          iframe.closest(".wp-block-embed");

        if (isVideoEmbed) {
          // Check if already wrapped
          if (iframe.closest(".video-responsive-wrapper")) return;

          // Create responsive wrapper
          const wrapper = document.createElement("div");
          wrapper.className =
            "video-responsive-wrapper relative w-full my-6 overflow-hidden rounded-lg bg-gray-100";
          wrapper.style.paddingBottom = "56.25%"; // 16:9 aspect ratio

          // Style the iframe
          iframe.className = "absolute top-0 left-0 w-full h-full border-0";
          iframe.style.width = "100%";
          iframe.style.height = "100%";

          // Remove any fixed dimensions
          iframe.removeAttribute("width");
          iframe.removeAttribute("height");

          // Wrap the iframe
          iframe.parentNode?.insertBefore(wrapper, iframe);
          wrapper.appendChild(iframe);
        }
      });

      // Handle HTML5 video elements
      const videos = containerRef.current?.querySelectorAll("video");
      videos?.forEach((video) => {
        video.className = "w-full h-auto max-w-full rounded-lg my-6";
        video.style.maxWidth = "100%";
        video.style.height = "auto";
      });

      // Handle WordPress embed blocks
      const embedBlocks = containerRef.current?.querySelectorAll(
        ".wp-block-embed, .wp-block-embed__wrapper"
      );
      embedBlocks?.forEach((block) => {
        block.className = "w-full my-6 overflow-hidden rounded-lg";
      });
    };

    // Apply responsive video handling
    handleResponsiveVideos();

    // Add custom styles to the container
    if (containerRef.current) {
      const style = document.createElement("style");
      style.textContent = `
                 .content-renderer .wp-block-embed {
           margin: 1.5rem 0;
           width: 100%;
         }
         
         .content-renderer .wp-block-embed__wrapper {
           position: relative;
           width: 100%;
           padding-bottom: 56.25%;
           overflow: hidden;
           border-radius: 0.5rem;
         }
         
         .content-renderer .wp-block-embed iframe {
           position: absolute;
           top: 0;
           left: 0;
           width: 100% !important;
           height: 100% !important;
           border: 0;
         }
         
         .content-renderer iframe {
           max-width: 100% !important;
         }
         
         .content-renderer .video-responsive-wrapper {
           position: relative;
           width: 100%;
           padding-bottom: 56.25%;
           overflow: hidden;
           border-radius: 0.5rem;
           margin: 1.5rem 0;
         }
         
         .content-renderer .video-responsive-wrapper iframe {
           position: absolute;
           top: 0;
           left: 0;
           width: 100% !important;
           height: 100% !important;
           border: 0;
         }
         
         @media (max-width: 768px) {
           .content-renderer iframe {
             max-width: 100% !important;
             width: 100% !important;
           }
           
           .content-renderer .video-responsive-wrapper {
             margin: 1rem 0;
           }
         }
      `;

      // Add style to head if not already present
      if (!document.querySelector("#video-responsive-styles")) {
        style.id = "video-responsive-styles";
        document.head.appendChild(style);
      }
    }
  }, [content]);

  return (
    <div className={`content-renderer ${className}`}>
      <Prose className={className}>
        <div ref={containerRef} />
      </Prose>
    </div>
  );
};

export default ContentRenderer;
