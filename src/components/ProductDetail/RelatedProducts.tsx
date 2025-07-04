"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WordPressPost } from "@/lib/type";

interface RelatedProductsProps {
  posts: WordPressPost[];
}

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    title: { rendered: "42171 Mercedes-AMG F1 W14 E Performance P63001" },
    slug: "mercedes-amg-f1-w14",
    featured_media: "/api/placeholder/400/300",
    date: "2024-03-27T00:00:00Z",
    excerpt: {
      rendered: "High-performance F1 racing car model with detailed features.",
    },
  },
  {
    id: 2,
    title: { rendered: "75337 AT-TE Walker GC331" },
    slug: "at-te-walker-gc331",
    featured_media: "/api/placeholder/400/300",
    date: "2024-09-15T00:00:00Z",
    excerpt: {
      rendered: "Iconic Star Wars AT-TE Walker with interactive features.",
    },
  },
  {
    id: 3,
    title: { rendered: "10326 Natural History Museum P58101" },
    slug: "natural-history-museum",
    featured_media: "/api/placeholder/400/300",
    date: "2024-12-19T00:00:00Z",
    excerpt: {
      rendered:
        "Detailed museum building with intricate architectural elements.",
    },
  },
  {
    id: 4,
    title: { rendered: "21058 Great Pyramid of Giza P45002" },
    slug: "great-pyramid-giza",
    featured_media: "/api/placeholder/400/300",
    date: "2024-11-10T00:00:00Z",
    excerpt: {
      rendered: "Ancient wonder recreated in LEGO form with authentic details.",
    },
  },
];

export default function RelatedProducts({ posts }: RelatedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayPosts = posts.length > 0 ? posts : mockPosts;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayPosts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPosts = displayPosts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const decodeHtmlEntities = (text: string) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          RELATED <span className="font-black">POSTS</span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            disabled={totalPages <= 1}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div key={post.id} className="group">
            <div className="bg-gray-50 rounded-lg overflow-hidden mb-4 p-4">
              <div className="aspect-[4/3] relative">
                <Image
                  src={
                    (post as any)._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url || "/home-n.png"
                  }
                  alt={decodeHtmlEntities(post.title.rendered)}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="flex gap-4">
              {/* Date Label */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden w-[40px] h-[70px] shadow-sm flex flex-col shrink-0">
                <div className="bg-gray-100 text-gray-800 text-center flex-1 flex items-center justify-center">
                  <div className="text-xl font-bold leading-none">
                    {new Date(post.date).getDate().toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="bg-blue-600 text-white text-center flex-1 flex items-center justify-center">
                  <div className="text-sm font-medium leading-none">
                    {new Date(post.date).toLocaleDateString("en", {
                      month: "short",
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {decodeHtmlEntities(post.title.rendered)}
                </h3>
                <Link
                  href={`/product?slug=${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  read more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
