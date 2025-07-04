import { redirect } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/layout/PostCard";
import RightSidebar from "@/components/layout/RightSidebar";
import { getPostsBySearch } from "@/lib/queries";
import { WordPressPost } from "@/lib/type";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface SearchPageProps {
  searchParams: SearchParams;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchQuery = params.q as string;

  if (!searchQuery) {
    return {
      title: "Search - BRIXSPARK",
    };
  }

  return {
    title: `Search: ${searchQuery} - BRIXSPARK`,
  };
}

// Pagination component
function Pagination({
  currentPage,
  totalPages,
  searchQuery,
}: {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show max 5 page numbers
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={`/search?q=${encodeURIComponent(searchQuery)}&page=${
            currentPage - 1
          }`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </Link>
      )}

      {/* Page numbers */}
      {getPageNumbers().map((page) => (
        <Link
          key={page}
          href={`/search?q=${encodeURIComponent(searchQuery)}&page=${page}`}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? "text-white bg-blue-500 border border-blue-500"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={`/search?q=${encodeURIComponent(searchQuery)}&page=${
            currentPage + 1
          }`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = params.q as string;
  const pageParam = params.page as string;
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  // 如果没有搜索参数，重定向到首页
  if (!searchQuery) {
    redirect("/");
  }

  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: `SEARCH - ${searchQuery}`, isActive: true },
  ];

  // Fetch search results from WordPress
  let searchResults: {
    posts: WordPressPost[];
    totalPages: number;
    totalPosts: number;
  };
  let error: string | null = null;

  try {
    searchResults = await getPostsBySearch(searchQuery, {
      per_page: 12, // Show 12 posts per page
      page: currentPage,
      orderby: "relevance",
    });
  } catch (err) {
    console.error("Search error:", err);
    error = "Failed to fetch search results. Please try again.";
    searchResults = {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
    };
  }

  const { posts, totalPages, totalPosts } = searchResults;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Page Header with Breadcrumb and Title */}
      <PageHeader
        title={`Search Results - ${searchQuery}`}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 pb-12">
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Content - Products Grid (70% width) */}
            <div className="flex-1 w-full lg:w-3/4">
              {/* Search Results Info */}
              <div className="mb-4">
                {error ? (
                  <p className="text-red-600">{error}</p>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Found {totalPosts} result{totalPosts !== 1 ? "s" : ""} for
                    &ldquo;{searchQuery}&rdquo;
                    {totalPages > 1 && (
                      <span className="ml-2">
                        (Page {currentPage} of {totalPages})
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-500 text-lg mb-4">{error}</p>
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-block"
                  >
                    Try Again
                  </Link>
                </div>
              )}

              {/* Products Grid */}
              {!error && (
                <>
                  {posts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((product) => (
                          <PostCard key={product.id} product={product} />
                        ))}
                        {/* <PostCard /> */}
                      </div>

                      {/* Pagination */}
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        searchQuery={searchQuery}
                      />
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg mb-4">
                        No results found for &ldquo;{searchQuery}&rdquo;
                      </p>
                      <p className="text-gray-400">
                        Try searching with different keywords or check your
                        spelling.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Sidebar (30% width) */}
            <div className="w-full lg:w-1/4">
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
