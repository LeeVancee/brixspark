import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { mockRecentPosts } from "@/lib/mockData";

export default function RecentPosts() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">RECENT POSTS</h3>
      <div className="space-y-3">
        {mockRecentPosts.map((post) => (
          <div key={post.id} className="group">
            <Link 
              href={`/instructions/${post.slug}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
              <span className="line-clamp-2">{post.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 