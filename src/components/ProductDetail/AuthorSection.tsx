import Link from "next/link";
import { WordPressPost } from "@/lib/mockData";

interface AuthorSectionProps {
  product: WordPressPost;
}

export default function AuthorSection({ product }: AuthorSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Author</h3>
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            <Link href="#" className="text-blue-600">
              {product._embedded?.author?.[0]?.name || "fengma_admin"}
            </Link>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            LEGO instruction manual expert and lighting kit specialist.
          </p>
        </div>
      </div>
    </div>
  );
}