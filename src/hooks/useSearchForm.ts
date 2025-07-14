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
      try {
          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      } finally {
        setIsLoading(false);
      }
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