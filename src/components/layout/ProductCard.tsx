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
      <div className="relative bg-black aspect-[4/3]">
        <Image
          src={product._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/home-n.png"}
          alt={product.title.rendered}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Date Label */}
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-center rounded-md px-3 py-2 min-w-[60px]">
          <div className="text-lg font-bold leading-none">{day}</div>
          <div className="text-sm leading-none">{month}</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="mb-4">
          <Link 
            href={`/product?slug=${product.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-lg leading-tight transition-colors"
          >
            {product.title.rendered}
          </Link>
        </h3>
        
        {/* Description (if available) */}
        {product.excerpt.rendered && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.excerpt.rendered.replace(/<[^>]*>/g, '')}
          </p>
        )}
        
        {/* Read More Button */}
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <Link href={`/product?slug=${product.slug}`}>
            READ MORE...
          </Link>
        </Button>
      </div>
    </article>
  );
} 