import Image from "next/image";
import { WordPressPost } from "@/lib/mockData";

interface ProductGalleryProps {
  product: WordPressPost;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      {/* Main Product Image */}
      <div className="relative bg-gray-100 aspect-square">
        <Image
          src={product._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/home-n.png"}
          alt={product.title.rendered}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
    </div>
  );
}