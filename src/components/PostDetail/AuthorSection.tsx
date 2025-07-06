import Link from "next/link";
import { WordPressPost } from "@/lib/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorSectionProps {
  product: WordPressPost;
}

export default function AuthorSection({ product }: AuthorSectionProps) {
  const author = product._embedded?.author?.[0];

  // 获取作者头像 URL (WordPress 通常提供多种尺寸)
  const getAvatarUrl = () => {
    if (author?.avatar_urls) {
      // 优先使用较大的头像，如果没有则使用较小的
      return (
        author.avatar_urls["96"] ||
        author.avatar_urls["48"] ||
        author.avatar_urls["24"] ||
        null
      );
    }
    return null;
  };

  // 获取作者姓名的首字母作为 fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className=" p-4 mb-4">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Author</h3>
      <div className="flex items-start gap-3">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={getAvatarUrl() || undefined}
            alt={author?.name || "Author"}
          />
          <AvatarFallback className="text-lg font-semibold">
            {author?.name ? getInitials(author.name) : "A"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {author?.link ? (
              <Link href="#" className="text-blue-500 hover:text-blue-600">
                {author.name}
              </Link>
            ) : (
              <span className="text-gray-800">{author?.name || "Admin"}</span>
            )}
          </p>
          <p className="text-gray-600 text-xs mt-1">
            {author?.description || "Content contributor"}
          </p>
          {author?.url && (
            <p className="text-blue-500 text-xs mt-1">
              <Link href={author.url} className="hover:text-blue-600">
                Visit author&apos;s website
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
