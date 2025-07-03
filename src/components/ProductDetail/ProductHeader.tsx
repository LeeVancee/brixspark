import { WordPressPost } from "@/lib/type";

interface ProductHeaderProps {
  product: WordPressPost;
}

// Format date to display format like "02 Jul"
function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en', { month: 'short' });
  return { day, month };
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const { day, month } = formatDate(product.date);

  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        {/* Date Label */}
        <div className="bg-blue-600 text-white text-center rounded-md px-3 py-2 min-w-[60px] shrink-0">
          <div className="text-lg font-bold leading-none">{day}</div>
          <div className="text-sm leading-none">{month}</div>
        </div>
        
        {/* Title */}
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
            {product.title.rendered}
          </h1>
       
        </div>
      </div>
    </div>
  );
}