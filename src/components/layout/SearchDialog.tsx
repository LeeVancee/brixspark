"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { File, Search } from "lucide-react";
import Image from "next/image";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { getPostsBySearch } from "@/lib/queries";
import { WordPressPost } from "@/lib/type";
import { formatDate, decodeHtmlEntities } from "@/lib/utils";

// Props for SearchDialog
interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// 防抖函数
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300); // 300ms 防抖
  const [results, setResults] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);

  // 搜索逻辑
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await getPostsBySearch(debouncedQuery, { per_page: 5 });
        setResults(res.posts);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]); //
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [debouncedQuery, isOpen]);

  // 选中后跳转
  const handleSelect = useCallback(
    (slug: string) => {
      if (slug.startsWith("/")) {
        router.push(slug);
      } else {
        router.push(`/product?slug=${slug}`);
      }
      onOpenChange(false);
    },
    [router, onOpenChange]
  );

  return (
    <>
      {/* 这个按钮只是用来触发，实际显示在Header中 */}
      <button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white shadow-lg hidden"
      >
        <Search className="w-5 h-5" />
      </button>

      <CommandDialog open={isOpen} onOpenChange={onOpenChange}>
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {loading && (
            <div className="p-4 text-sm text-center text-gray-500">
              Fetching results...
            </div>
          )}

          {!loading && debouncedQuery.length > 1 && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {results.length > 0 && (
            <CommandGroup heading="Search Results">
              {results.map((post) => {
                const formattedDate = formatDate(post.date);
                const imageUrl =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.media_details
                    ?.sizes?.thumbnail?.source_url;

                return (
                  <CommandItem
                    key={post.id}
                    value={post.title.rendered}
                    onSelect={() => handleSelect(post.slug)}
                    className="cursor-pointer"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={decodeHtmlEntities(post.title.rendered)}
                        width={24}
                        height={24}
                        className="mr-2 h-6 w-6 rounded object-cover"
                      />
                    ) : (
                      <File className="mr-2 h-6 w-6" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {decodeHtmlEntities(post.title.rendered)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formattedDate.month} {formattedDate.day}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}  
        </CommandList>
      </CommandDialog>
    </>
  );
}
