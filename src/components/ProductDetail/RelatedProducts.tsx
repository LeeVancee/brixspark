import Image from "next/image";
import Link from "next/link";
import { WordPressPost } from "@/lib/mockData";

interface RelatedProductsProps {
  products: WordPressPost[];
}

// Format date to display format like "02 Jul"
function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en', { month: 'short' });
  return { day, month };
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h4 className="text-2xl font-bold text-gray-800 mb-6">
        Related <strong className="text-blue-600">Posts</strong>
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((relatedProduct: WordPressPost) => {
          const { day, month } = formatDate(relatedProduct.date);
          return (
            <article key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Link href={`/product?slug=${relatedProduct.slug}`}>
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={relatedProduct._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/home-n.png"}
                    alt={relatedProduct.title.rendered}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              
              {/* Date */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="font-bold">{day}</span>
                  <span>{month}</span>
                  <time>{new Date(relatedProduct.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                
                {/* Title */}
                <h4 className="font-semibold text-gray-800 mb-2">
                  <Link href={`/product?slug=${relatedProduct.slug}`}>
                    {relatedProduct.title.rendered}
                  </Link>
                </h4>
                
                {/* Excerpt */}
                <div className="text-sm text-gray-600">
                  <p className="line-clamp-2 mb-2">{relatedProduct.excerpt.rendered.replace(/<[^>]*>/g, '')}</p>
                  <Link 
                    href={`/product?slug=${relatedProduct.slug}`}
                    className="text-blue-600 font-medium inline-flex items-center gap-1"
                  >
                    read more 
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}