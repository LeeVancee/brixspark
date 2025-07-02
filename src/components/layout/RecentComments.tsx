import Link from "next/link";
import { mockRecentComments } from "@/lib/mockData";

export default function RecentComments() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">RECENT COMMENTS</h3>
      <div className="space-y-4">
        {mockRecentComments.map((comment) => (
          <div key={comment.id} className="text-sm">
            <div className="flex items-start gap-2">
              <Link 
                href={`/posts/${comment.postSlug}`}
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                {comment.author}
              </Link>
              <span className="text-gray-500">on</span>
              <Link 
                href={`/posts/${comment.postSlug}`}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {comment.postTitle}
              </Link>
            </div>
            <p className="text-gray-600 mt-1 line-clamp-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 