"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WordPressPost } from "@/lib/type";
import { Card } from "../ui/card";
import { formatDate, decodeHtmlEntities } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface RelatedProductsProps {
  posts: WordPressPost[];
}

export default function RelatedProducts({ posts }: RelatedProductsProps) {
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

  // 自动播放插件配置
  const autoplayPlugin = Autoplay({
    delay: 4000, // 4秒自动切换
    stopOnInteraction: true, // 用户交互时停止
    stopOnMouseEnter: true, // 鼠标悬停时停止
  });

  return (
    <div className="p-3 md:p-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">
        RELATED <span className="font-black">POSTS</span>
      </h2>

      <div className="relative px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayPlugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((post) => (
              <CarouselItem
                key={post.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="w-full max-w-md md:max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg gap-2 p-0">
                  {/* Product Image Section */}
                  <div className="relative">
                    <div className="aspect-square bg-gray-50">
                      <Image
                        src={
                          post._embedded?.["wp:featuredmedia"]?.[0]
                            ?.source_url || "/home-n.png"
                        }
                        alt={decodeHtmlEntities(post.title.rendered)}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-3 md:p-2 flex items-center gap-3 md:gap-4">
                    {/* Date indicator */}
                    <div className="flex-shrink-0 w-[36px] h-[60px] md:w-[40px] md:h-[70px] overflow-hidden rounded-lg shadow-sm">
                      <div className="bg-gray-100 flex-1 flex items-center justify-center h-1/2">
                        <div className="text-base md:text-lg font-bold text-gray-800">
                          {formatDate(post.date).day}
                        </div>
                      </div>
                      <div className="bg-blue-500 flex-1 flex items-center justify-center h-1/2">
                        <div className="text-white font-medium text-xs text-center">
                          {formatDate(post.date).month}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <h2 className="text-base md:text-lg font-medium text-blue-500 leading-tight line-clamp-2">
                        {decodeHtmlEntities(post.title.rendered)}
                      </h2>

                      <Link
                        href={`/product?p=${post.id}`}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-500 transition-colors"
                      >
                        <span className="text-sm font-medium">read more</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="flex -left-8 md:-left-10" />
          <CarouselNext className="flex -right-8 md:-right-10" />
        </Carousel>
      </div>
    </div>
  );
}
