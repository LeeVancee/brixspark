import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { WordPressPost } from "@/lib/type";
import { formatDate, decodeHtmlEntities } from "@/lib/utils";

interface ProductCardProps {
  product: WordPressPost;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { day, month } = formatDate(product.date);
  const decodedTitle = decodeHtmlEntities(product.title.rendered);

  return (
    <Card className="w-full max-w-sm overflow-hidden bg-white shadow-lg p-0">
      <div className="relative">
        <div className="aspect-square bg-gray-50 p-6">
          <Image
            src={
              product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/home-n.png"
            }
            alt={decodedTitle}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Date indicator */}
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-t-xl px-3 py-2">
            <div className="text-2xl font-bold text-gray-800">{day}</div>
          </div>
          <div className="bg-blue-500 rounded-b-xl px-3 py-1">
            <div className="text-white font-medium text-sm">{month}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-medium text-blue-500 leading-tight">
          <Link
            href={`/product?slug=${product.slug}`}
            className="hover:text-blue-500 transition-colors"
          >
            {decodedTitle}
          </Link>
        </h2>

        <Button
          variant="outline"
          className="w-full py-3 text-gray-600 border-gray-300 hover:bg-gray-50 font-medium bg-transparent"
          asChild
        >
          <Link href={`/product?slug=${product.slug}`}>READ MORE...</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
