import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // 不设置 setIsLoading(false)，让路由跳转时保持 loading 状态
    }
  };

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  return {
    searchQuery,
    isLoading,
    handleSubmit,
    handleQueryChange,
  };
}