import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/RightSidebar";
import { getProductBySlug, mockProducts, Product } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface ProductPageProps {
  searchParams: SearchParams;
}

// Format date to display format like "02 Jul"
function formatDate(dateString: string): { day: string; month: string } {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en', { month: 'short' });
  return { day, month };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const slug = params.slug as string || "21358-minifigure-vending-machine-p90701";
  
  // Get product by slug
  const product = getProductBySlug(slug);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
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

  const { day, month } = formatDate(product.date);
  
  // Build breadcrumbs
  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: product.title.toUpperCase(), href: `/product?slug=${product.slug}` },
    { label: "母接式", isActive: false },
    { label: product.title.toUpperCase(), isActive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Page Header with Breadcrumb and Title */}
      <PageHeader 
        title={product.title}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Content - Product Details (70% width) */}
            <div className="flex-1 w-full lg:w-3/4">
              
              {/* Product Title with Date */}
              <div className="  p-6  mb-6">
                <div className="flex items-start gap-4">
                  {/* Date Label */}
                  <div className="bg-blue-600 text-white text-center rounded-md px-3 py-2 min-w-[60px] shrink-0">
                    <div className="text-lg font-bold leading-none">{day}</div>
                    <div className="text-sm leading-none">{month}</div>
                  </div>
                  
                  {/* Title */}
                  <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
                      {product.title}
                    </h1>
                    <p className="text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Image Gallery */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                {/* Main Product Image */}
                <div className="relative bg-gray-100 aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                  

                </div>
              </div>

              {/* Post Content Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h2>
                
                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    By fengma_admin
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                                         <Link href="#" className="text-blue-600">链接式</Link>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                                         <Link href="#comments" className="text-blue-600">0 Comments</Link>
                  </span>
                </div>

                {/* Entry Content - PDF Download Gallery */}
                <div className="entry-content">
                  {product.downloadLinks?.pdf && (
                    <div className="text-center">
                      <a
                        href={product.downloadLinks.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <div className="relative bg-gray-100 rounded-lg p-8">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="bg-red-600 text-white p-6 rounded-lg">
                              <FileText className="w-12 h-12" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                              Click Here For PDF Installation Instruction
                            </h3>
                            <p className="text-gray-600">Download the complete building guide</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Share Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this post</h3>
                                 <div className="flex flex-wrap gap-3">
                   <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded">
                     Facebook
                   </a>
                   <a href="#" className="bg-blue-400 text-white px-4 py-2 rounded">
                     Twitter
                   </a>
                   <a href="#" className="bg-blue-800 text-white px-4 py-2 rounded">
                     LinkedIn
                   </a>
                   <a href="#" className="bg-red-600 text-white px-4 py-2 rounded">
                     Google +
                   </a>
                   <a href="#" className="bg-gray-600 text-white px-4 py-2 rounded">
                     Email
                   </a>
                 </div>
              </div>

              {/* Author Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                                         <p className="font-semibold text-gray-800">
                       <Link href="#" className="text-blue-600">fengma_admin</Link>
                     </p>
                    <p className="text-gray-600 text-sm mt-1">
                      LEGO instruction manual expert and lighting kit specialist.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6" id="comments">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave a Reply</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Comment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="comment"
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your comment..."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="save-info"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
                      Save my name, email, and website in this browser for the next time I comment.
                    </label>
                  </div>

                                     <Button 
                     type="submit" 
                     className="bg-blue-600 text-white px-6 py-2"
                   >
                    Post Comment
                  </Button>
                </form>
              </div>

              {/* Product Description */}
              {product.fullDescription && (
                <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.fullDescription}
                  </p>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar (30% width) */}
            <div className="w-full lg:w-1/4">
              <Sidebar />
            </div>

          </div>
          
          {/* Related Products Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">
              Related <strong className="text-blue-600">Posts</strong>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.slice(1, 4).map((relatedProduct: Product) => {
                const { day, month } = formatDate(relatedProduct.date);
                                 return (
                   <article key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <Link href={`/product?slug=${relatedProduct.slug}`}>
                      <div className="relative aspect-square bg-gray-100">
                                                 <Image
                           src={relatedProduct.image}
                           alt={relatedProduct.title}
                           fill
                           className="object-cover"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         />
                      </div>
                    </Link>
                    
                    {/* Date */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="font-bold">{day}</span>
                        <span>{month}</span>
                        <time>{new Date(relatedProduct.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </div>
                      
                                             {/* Title */}
                       <h4 className="font-semibold text-gray-800 mb-2">
                        <Link href={`/product?slug=${relatedProduct.slug}`}>
                          {relatedProduct.title}
                        </Link>
                      </h4>
                      
                      {/* Excerpt */}
                      <div className="text-sm text-gray-600">
                        <p className="line-clamp-2 mb-2">{relatedProduct.description}</p>
                                                 <Link 
                           href={`/product?slug=${relatedProduct.slug}`}
                           className="text-blue-600 font-medium inline-flex items-center gap-1"
                         >
                          read more 
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
    </div>
  );
}
