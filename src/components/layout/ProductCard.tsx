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
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en', { month: 'short' });
  return { day, month };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { day, month } = formatDate(product.date);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container with Date Label */}
      <div className="relative bg-gray-100 aspect-[4/3] overflow-hidden group">
        <Image
          src={product._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/home-n.png"}
          alt={product.title.rendered}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
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
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-3">
          <Link 
            href={`/product?slug=${product.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-base leading-tight transition-colors line-clamp-2"
          >
            {product.title.rendered}
          </Link>
        </h3>
        
        {/* Description (if available) */}
        {product.excerpt.rendered && (
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {product.excerpt.rendered.replace(/<[^>]*>/g, '')}
          </p>
        )}
        
        {/* Read More Button */}
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="text-gray-600 border-gray-300 hover:bg-gray-50 text-xs h-7"
        >
          <Link href={`/product?slug=${product.slug}`}>
            READ MORE...
          </Link>
        </Button>
      </div>
    </article>
  );
} 