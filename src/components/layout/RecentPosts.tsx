"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllPosts } from "@/lib/queries";
import { WordPressPost } from "@/lib/type";
import { decodeHtmlEntities } from "@/lib/utils";
import { useState, useEffect } from "react";

// Skeleton component
function RecentPostsSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">RECENT POSTS</h3>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse mt-1 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecentPosts() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { posts: fetchedPosts } = await getAllPosts({
          per_page: 5,
          orderby: "date",
          order: "desc",
        });
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching recent posts:", err);
        setError("Unable to load recent posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <RecentPostsSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">RECENT POSTS</h3>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">RECENT POSTS</h3>
      <div className="space-y-3">
        {posts.map((post: WordPressPost) => (
          <div key={post.id} className="group">
            <Link
              href={`/product?p=${post.id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors text-sm"
            >
              <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
              <span className="line-clamp-2">
                {decodeHtmlEntities(post.title.rendered)}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
