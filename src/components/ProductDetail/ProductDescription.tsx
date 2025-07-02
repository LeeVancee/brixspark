import { WordPressPost } from "@/lib/mockData";

interface ProductDescriptionProps {
  product: WordPressPost;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  if (!product.content.rendered) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
      <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: product.content.rendered }} />
      </div>
    </div>
  );
}