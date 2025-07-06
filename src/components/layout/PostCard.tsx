import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { WordPressPost } from "@/lib/type";
import { formatDate, decodeHtmlEntities } from "@/lib/utils";

interface PostCardProps {
  product: WordPressPost;
}

export default function PostCard({ product }: PostCardProps) {
  const { day, month } = formatDate(product.date);
  const decodedTitle = decodeHtmlEntities(product.title.rendered);

  return (
    <Card className="w-full max-w-sm md:max-w-sm overflow-hidden bg-white shadow-lg gap-2 p-0 mx-auto">
      <div className="relative">
        <div className="aspect-square bg-gray-50">
          <Image
            src={
              product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/home-n.png"
            }
            alt={decodedTitle}
            width={400}
            height={400}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Date indicator */}
        <div className="absolute top-4 right-4 w-[40px] h-[70px] overflow-hidden rounded-md shadow-sm">
          <div className="bg-white flex-1 flex items-center justify-center h-1/2">
            <div className="text-lg font-bold text-gray-800">{day}</div>
          </div>
          <div className="bg-blue-500 flex-1 flex items-center justify-center h-1/2">
            <div className="text-white font-medium text-xs">{month}</div>
          </div>
        </div>
      </div>

      <CardContent className="p-3 space-y-4">
        <h2 className="text-xl font-medium text-blue-500 leading-tight line-clamp-2">
          <Link
            href={`/product?p=${product.id}`}
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
          <Link href={`/product?p=${product.id}`}>READ MORE...</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
