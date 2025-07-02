import Link from "next/link";
import { mockRecentComments, mockProducts, WordPressComment } from "@/lib/mockData";

export default function RecentComments() {
  // Helper function to get post by ID
  const getPostById = (postId: number) => {
    return mockProducts.find(post => post.id === postId);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">RECENT COMMENTS</h3>
      <div className="space-y-4">
        {mockRecentComments.map((comment: WordPressComment) => {
          const post = getPostById(comment.post);
          return (
            <div key={comment.id} className="text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">
                  {comment.author_name}
                </span>
                <span className="text-gray-500">on</span>
                {post && (
                  <Link 
                    href={`/product?slug=${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {post.title.rendered}
                  </Link>
                )}
              </div>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {comment.content.rendered.replace(/<[^>]*>/g, '')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 