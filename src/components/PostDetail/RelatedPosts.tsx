"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WordPressPost } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { formatDate, decodeHtmlEntities } from "@/lib/utils";

interface RelatedProductsProps {
  posts: WordPressPost[];
}

export default function RelatedProducts({ posts }: RelatedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 如果没有传入 posts，则不显示任何内容
  if (!posts || posts.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          RELATED <span className="font-black">POSTS</span>
        </h2>
        <p className="text-gray-600">没有找到相关文章。</p>
      </div>
    );
  }

  const displayPosts = posts;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayPosts.length / itemsPerPage);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPosts = displayPosts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const { day, month } = formatDate(currentPosts[0].date);

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        RELATED <span className="font-black">POSTS</span>
      </h2>

      {/* 轮播容器 */}
      <div className="relative">
        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => {
            const { day, month } = formatDate(post.date);

            return (
              <Card
                key={post.id}
                className="w-full max-w-56 overflow-hidden bg-white rounded-lg shadow-lg p-0"
              >
                {/* Product Image Section */}
                <div className="relative bg-gray-50 p-4">
                  <Image
                    src={
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "/home-n.png"
                    }
                    alt={decodeHtmlEntities(post.title.rendered)}
                    width={400}
                    height={300}
                    className="w-full h-40 object-contain"
                  />
                </div>

                {/* Content Section */}
                <div className="p-2 flex items-center gap-4">
                  {/* Date indicator */}
                  <div className="flex-shrink-0 w-[40px] h-[70px] overflow-hidden rounded-lg shadow-sm">
                    <div className="bg-gray-100 flex-1 flex items-center justify-center h-1/2">
                      <div className="text-lg font-bold text-gray-800">
                        {day}
                      </div>
                    </div>
                    <div className="bg-blue-500 flex-1 flex items-center justify-center h-1/2">
                      <div className="text-white font-medium text-xs text-center">
                        {month}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <h2 className="text-lg font-medium text-blue-500 leading-tight line-clamp-2">
                      {decodeHtmlEntities(post.title.rendered)}
                    </h2>

                    <Link
                      href={`/product?slug=${post.slug}`}
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-sm font-medium">read more</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              variant="ghost"
              size="icon"
              className={`w-3 h-3 p-0 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
