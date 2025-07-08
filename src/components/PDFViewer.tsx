import { FileText, ExternalLink } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <div className="bg-gray-100 p-3 rounded-t-lg border-b flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          {title}
        </h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors no-underline"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open in New Tab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative bg-white rounded-b-lg overflow-hidden">
        <iframe
          src={url}
          className="w-full h-[700px] md:h-[1000px] border-0"
          title={title}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
