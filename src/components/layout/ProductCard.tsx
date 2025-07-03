import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WordPressPost } from "@/lib/type";

interface ProductCardProps {
  product: WordPressPost;
}

// Format date to display format like "02 Jul"
function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en", { month: "short" });
  return { day, month };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { day, month } = formatDate(product.date);

  // Decode HTML entities in title
  const decodeHtmlEntities = (text: string) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  };

  const decodedTitle = decodeHtmlEntities(product.title.rendered);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[360px] flex flex-col">
      {/* Image Container with Date Label */}
      <div className="relative h-[240px] overflow-hidden group flex-shrink-0 bg-gray-50 flex items-center justify-center">
        <Image
          src={
            product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/home-n.png"
          }
          alt={decodedTitle}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Date Label */}
        <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-md overflow-hidden w-[40px] h-[70px] shadow-sm flex flex-col">
          <div className="bg-gray-100 text-gray-800 text-center flex-1 flex items-center justify-center">
            <div className="text-base font-bold leading-none">{day}</div>
          </div>
          <div className="bg-blue-600 text-white text-center flex-1 flex items-center justify-center">
            <div className="text-xs font-medium leading-none">{month}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="flex-1 flex items-start">
          <Link
            href={`/product?slug=${product.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-base leading-snug transition-colors line-clamp-3"
          >
            {decodedTitle}
          </Link>
        </h3>

        {/* Read More Button */}
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-gray-600 border-gray-300 hover:bg-gray-50 text-sm h-8 w-full"
          >
            <Link href={`/product?slug=${product.slug}`}>READ MORE...</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
