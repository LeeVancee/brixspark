import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllPosts } from "@/lib/queries";
import { WordPressPost } from "@/lib/type";
import { decodeHtmlEntities } from "@/lib/utils";

export default async function RecentPosts() {
  try {
    // Fetch recent posts from WordPress API
    const { posts } = await getAllPosts({
      per_page: 5,
      orderby: "date",
      order: "desc",
    });

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">RECENT POSTS</h3>
        <div className="space-y-3">
          {posts.map((post: WordPressPost) => (
            <div key={post.id} className="group">
              <Link
                href={`/product?slug=${post.slug}`}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <span className="line-clamp-2">
                  {decodeHtmlEntities(post.title.rendered)}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">RECENT POSTS</h3>
        <div className="text-gray-500 text-sm">Unable to load recent posts</div>
      </div>
    );
  }
}
