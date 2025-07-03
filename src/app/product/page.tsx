import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/RightSidebar";
import ProductHeader from "@/components/ProductDetail/ProductHeader";
import { getPostBySlug, getAllPosts } from "@/lib/queries";
import { WordPressPost } from "@/lib/type";
import Link from "next/link";
import Image from "next/image";
import AuthorSection from "@/components/ProductDetail/AuthorSection";
import SocialShare from "@/components/ProductDetail/SocialShare";
import CommentForm from "@/components/ProductDetail/CommentForm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface ProductPageProps {
  searchParams: SearchParams;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const slug = params.slug as string || "21358-minifigure-vending-machine-p90701";
  
  // Get product by slug from WordPress API
  const product = await getPostBySlug(slug);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The requested product could not be found.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Build breadcrumbs
  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: product.title.rendered.toUpperCase(), href: `/product?slug=${product.slug}` },
    { label: "母接式", isActive: false },
    { label: product.title.rendered.toUpperCase(), isActive: true }
  ];

  // Get related products (exclude current product)
  const relatedPostsResponse = await getAllPosts({ per_page: 4, orderby: 'date', order: 'desc' });
  const relatedProducts = relatedPostsResponse.posts.filter((p: WordPressPost) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Page Header with Breadcrumb and Title */}
      <PageHeader 
        title={product.title.rendered}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Content - Product Details (70% width) */}
            <div className="flex-1 w-full lg:w-3/4">
              
              {/* Product Header */}
              <ProductHeader product={product} />

              {/* Product Content */}
              <div className="bg-white rounded-lg p-6  mb-6">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.content.rendered }} 
                />
              </div>

              {/* Author Section */}
              <AuthorSection product={product} />

              {/* Social Share */}
              <SocialShare />

              {/* Comment Form */}
              <CommentForm />

            </div>

            {/* Right Sidebar (30% width) */}
            <div className="w-full lg:w-1/4">
              <Sidebar />
            </div>

          </div>
          
          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct: WordPressPost) => (
                  <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {relatedProduct._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                      <div className="relative w-full h-48">
                        <Image 
                          src={relatedProduct._embedded['wp:featuredmedia'][0].source_url}
                          alt={relatedProduct.title.rendered}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {relatedProduct.title.rendered}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {relatedProduct.excerpt.rendered.replace(/<[^>]*>/g, '')}
                      </p>
                      <Link 
                        href={`/product?slug=${relatedProduct.slug}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
     
      {/* Footer */}
      <Footer />
      
    </div>
  );
}