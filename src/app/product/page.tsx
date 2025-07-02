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
               {/* Entry Content - PDF Preview */}
               <div className="entry-content pb-4">
                  {product.downloadLinks?.pdf && (
                    <div className="space-y-4">
                      {/* PDF Viewer Header */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
                    
                        <div className="flex items-center gap-2">
                          <a
                            href={product.downloadLinks.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </a>
                          <a
                            href={product.downloadLinks.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-600 text-white px-4 py-2 rounded text-sm"
                          >
                            Open in New Tab
                          </a>
                        </div>
                      </div>

                      {/* PDF Viewer */}
                      <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                        <iframe
                          src={`${product.downloadLinks.pdf}#toolbar=1&navpanes=1&scrollbar=1`}
                          width="100%"
                          height="800"
                          style={{ border: 'none' }}
                          title={`${product.title} - PDF Instructions`}
                          loading="lazy"
                        >
                          {/* Fallback for browsers that don't support iframe PDF viewing */}
                          <div className="p-8 text-center bg-gray-50">
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              PDF Preview Not Available
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Your browser doesn't support inline PDF viewing.
                            </p>
                            <div className="space-x-4">
                              <a
                                href={product.downloadLinks.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-6 py-2 rounded inline-flex items-center gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Download PDF
                              </a>
                              <a
                                href={product.downloadLinks.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-600 text-white px-6 py-2 rounded"
                              >
                                View in Browser
                              </a>
                            </div>
                          </div>
                        </iframe>
                      </div>

                   
                    </div>
                  )}
                </div>

            

                            {/* Share Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this post</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="#" 
                    className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center w-12 h-12 transition-colors duration-200"
                    title="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-blue-400 text-white p-3 rounded-lg flex items-center justify-center w-12 h-12 transition-colors duration-200"
                    title="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-blue-800 text-white p-3 rounded-lg flex items-center justify-center w-12 h-12 transition-colors duration-200"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-red-600 text-white p-3 rounded-lg flex items-center justify-center w-12 h-12 transition-colors duration-200"
                    title="Share on Google+"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.331 3.295-2.604 0-4.731-2.16-4.731-4.823 0-2.662 2.122-4.822 4.728-4.822 1.485 0 2.479.633 3.045 1.178l2.073-1.994c-1.33-1.245-3.056-1.995-5.115-1.995C3.412 4.365 0 7.785 0 12.001s3.414 7.634 7.635 7.634c4.41 0 7.332-3.098 7.332-7.463 0-.502-.054-.885-.12-1.263H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.181h2.182v2.184h2.183v-2.184H24v-2.181z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-gray-600 text-white p-3 rounded-lg flex items-center justify-center w-12 h-12 transition-colors duration-200"
                    title="Share via Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
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
