import { FileText } from "lucide-react";
import React from "react";

interface PDFViewerProps {
  url: string;
  title?: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  title = "PDF Document",
  className = "",
}) => {
  return (
    <div className={`pdf-viewer-container ${className}`}>
      <div className="bg-gray-100 p-3 rounded-t-lg border-b">
        <h4 className="text-sm font-medium text-gray-700 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          {title}
        </h4>
      </div>
      <div className="relative bg-white rounded-b-lg overflow-hidden">
        <iframe
          src={url}
          className="w-full h-[700px] md:h-[1000px] border-0"
          title={title}
          loading="lazy"
        />
        <div className="absolute top-4 right-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm"
          >
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
