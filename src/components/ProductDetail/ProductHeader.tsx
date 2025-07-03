import { WordPressPost } from "@/lib/type";

interface ProductHeaderProps {
  product: WordPressPost;
}

// Format date to display format like "02 Jul"
function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en", { month: "short" });
  return { day, month };
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const { day, month } = formatDate(product.date);
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
    <div className="p-4 mb-4">
      <div className="flex items-start gap-3">
        {/* Date Label */}
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden w-[40px] h-[70px] shrink-0 shadow-sm flex flex-col">
          <div className="bg-gray-100 text-gray-800 text-center flex-1 flex items-center justify-center">
            <div className="text-lg font-bold leading-none">{day}</div>
          </div>
          <div className="bg-blue-600 text-white text-center flex-1 flex items-center justify-center">
            <div className="text-xs font-medium leading-none">{month}</div>
          </div>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl font-bold text-blue-600 mb-1">
            {decodedTitle}
          </h1>
        </div>
      </div>
    </div>
  );
}
