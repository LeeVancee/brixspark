import Link from "next/link";
import { WordPressPost } from "@/lib/type";

interface AuthorSectionProps {
  product: WordPressPost;
}

export default function AuthorSection({ product }: AuthorSectionProps) {
  const author = product._embedded?.author?.[0];

  return (
    <div className=" p-4 mb-4">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Author</h3>
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {author?.link ? (
              <Link
                href={author.link}
                className="text-blue-500 hover:text-blue-600"
              >
                {author.name}
              </Link>
            ) : (
              <span className="text-gray-800">{author?.name || "Admin"}</span>
            )}
          </p>
          <p className="text-gray-600 text-xs mt-1">
            {author?.description || "Content contributor"}
          </p>
          {author?.url && (
            <p className="text-blue-500 text-xs mt-1">
              <Link href={author.url} className="hover:text-blue-600">
                Visit author&apos;s website
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
