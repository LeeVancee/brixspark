import Link from "next/link";
import { getRecentComments, getPostById } from "@/lib/queries";
import { WordPressComment } from "@/lib/type";

export default async function RecentComments() {
  try {
    // Fetch recent comments from WordPress API
    const comments = await getRecentComments(5);

    if (comments.length === 0) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">RECENT COMMENTS</h3>
          <div className="text-gray-500 text-sm">
            No recent comments
          </div>
        </div>
      );
    }

    // Get post data for each comment
    const commentsWithPosts = await Promise.all(
      comments.map(async (comment: WordPressComment) => {
        const post = await getPostById(comment.post);
        return { comment, post };
      })
    );

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">RECENT COMMENTS</h3>
        <div className="space-y-4">
          {commentsWithPosts.map(({ comment, post }) => (
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
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching recent comments:', error);
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">RECENT COMMENTS</h3>
        <div className="text-gray-500 text-sm">
          Unable to load recent comments
        </div>
      </div>
    );
  }
} 