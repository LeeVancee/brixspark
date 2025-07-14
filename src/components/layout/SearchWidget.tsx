"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchForm } from "@/hooks/useSearchForm";

export default function SearchWidget() {
  const { searchQuery, isLoading, handleSubmit, handleQueryChange } = useSearchForm();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">Search</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" className="shrink-0" disabled={isLoading}>
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
