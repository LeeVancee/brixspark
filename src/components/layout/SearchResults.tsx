import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: `SEARCH - ${query}`, isActive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Page Header with Breadcrumb and Title */}
      <PageHeader 
        title={`Search Results - ${query}`}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
          <p className="text-gray-600">搜索内容区域</p>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
    </div>
  );
} 