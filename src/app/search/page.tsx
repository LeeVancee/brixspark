import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/layout/ProductCard";
import Sidebar from "@/components/layout/RightSidebar";
import { mockProducts, filterProducts } from "@/lib/mockData";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface SearchPageProps {
  searchParams: SearchParams;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = params.q as string;

  // 如果没有搜索参数，重定向到首页
  if (!searchQuery) {
    redirect('/');
  }

  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: `SEARCH - ${searchQuery}`, isActive: true }
  ];

  // Filter products based on search query
  const filteredProducts = filterProducts(mockProducts, searchQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Page Header with Breadcrumb and Title */}
      <PageHeader 
        title={`Search Results - ${searchQuery}`}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Content - Products Grid (70% width) */}
            <div className="flex-1 w-full lg:w-3/4">
              {/* Search Results Info */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No results found for "{searchQuery}"</p>
                  <p className="text-gray-400">Try searching with different keywords or check your spelling.</p>
                </div>
              )}
            </div>

            {/* Right Sidebar (30% width) */}
            <div className="w-full lg:w-1/4">
              <Sidebar />
            </div>

          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
    </div>
  );
} 