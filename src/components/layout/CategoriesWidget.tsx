import Link from "next/link";
import { getCategories } from "@/lib/queries";
import { WordPressCategory } from "@/lib/type";

export default async function CategoriesWidget() {
  let categories: WordPressCategory[] = [];

  try {
    const result = await getCategories();
    categories = result.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Filter out uncategorized and sort by post count
  const filteredCategories = categories
    .filter((category) => category.slug !== "uncategorized")
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Show top 10 categories

  if (filteredCategories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        Categories
      </h3>
      <div className="space-y-2">
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors group"
          >
            <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
              {category.name}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
