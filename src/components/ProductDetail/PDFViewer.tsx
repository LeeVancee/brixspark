import { Download } from "lucide-react";
import { WordPressPost } from "@/lib/mockData";

interface PDFViewerProps {
  product: WordPressPost;
}

export default function PDFViewer({ product }: PDFViewerProps) {
  if (!product.meta?.pdf_url) return null;

  return (
    <div className="entry-content pb-4">
      <div className="space-y-4">
        {/* PDF Viewer Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <a
              href={product.meta.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href={product.meta.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 text-white px-4 py-2 rounded text-sm"
            >
              Open in New Tab
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="border border-gray-200 rounded-b-lg overflow-hidden">
          <iframe
            src={`${product.meta.pdf_url}#toolbar=1&navpanes=1&scrollbar=1`}
            width="100%"
            height="800"
            style={{ border: 'none' }}
            title={`${product.title.rendered} - PDF Instructions`}
            loading="lazy"
          />
          {/* Fallback message below iframe */}
          <div className="p-4 text-center bg-gray-50 text-sm text-gray-600">
            If the PDF doesn't load, you can{" "}
            <a
              href={product.meta.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              open it in a new tab
            </a>{" "}
            or{" "}
            <a
              href={product.meta.pdf_url}
              download
              className="text-blue-600 underline"
            >
              download it directly
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}