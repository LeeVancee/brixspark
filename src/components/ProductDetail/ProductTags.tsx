import { WordPressPost } from "@/lib/type";

interface ProductTagsProps {
  product: WordPressPost;
}

export default function ProductTags({ product }: ProductTagsProps) {
  // WordPress stores tags in wp:term[1] array (categories are in wp:term[0])
  const tags = product._embedded?.['wp:term']?.[1];
  
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}