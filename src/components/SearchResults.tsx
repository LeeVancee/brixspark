import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Header with back button and search */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          {/* Search form */}
          <div className="w-full lg:w-auto lg:min-w-96">
            <form method="get" className="flex gap-2">
              <Input
                name="s"
                defaultValue={query}
                placeholder="Search..."
                className="flex-1 h-10 text-base bg-white border-white/20 placeholder:text-gray-500"
              />
              <Button 
                type="submit"
                size="default"
                className="h-10 px-4 bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Search Results Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <div className="text-center space-y-6">
            
            {/* Search Query Display */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Search Results
              </h1>
              <p className="text-lg text-gray-300">
                You searched for: <span className="font-semibold text-white bg-white/10 px-3 py-1 rounded-md">{query}</span>
              </p>
            </div>

            {/* Placeholder for search results */}
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-white/60" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Search functionality coming soon!
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  This is where the LEGO instruction search results for "{query}" would appear. 
                  The search parameter is successfully captured and can be used to query your database.
                </p>
              </div>
            </div>

            {/* Debug info */}
            <details className="text-left">
              <summary className="text-white cursor-pointer hover:text-gray-300">
                Debug Information (click to expand)
              </summary>
              <div className="mt-4 p-4 bg-black/20 rounded-md">
                <p className="text-sm text-gray-300">
                  <strong>URL Parameter:</strong> s={query}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side rendered'}
                </p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </div>
  );
} 