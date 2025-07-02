import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/RightSidebar";
import ProductHeader from "@/components/ProductDetail/ProductHeader";
import ProductGallery from "@/components/ProductDetail/ProductGallery";
import PDFViewer from "@/components/ProductDetail/PDFViewer";
import SocialShare from "@/components/ProductDetail/SocialShare";
import AuthorSection from "@/components/ProductDetail/AuthorSection";
import CommentForm from "@/components/ProductDetail/CommentForm";
import ProductDescription from "@/components/ProductDetail/ProductDescription";
import ProductTags from "@/components/ProductDetail/ProductTags";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import { getProductBySlug, mockProducts } from "@/lib/mockData";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface ProductPageProps {
  searchParams: SearchParams;
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
  
  // Build breadcrumbs
  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: product.title.rendered.toUpperCase(), href: `/product?slug=${product.slug}` },
    { label: "母接式", isActive: false },
    { label: product.title.rendered.toUpperCase(), isActive: true }
  ];

  // Get related products (exclude current product)
  const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
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

              {/* Product Image Gallery */}
              <ProductGallery product={product} />
              
              {/* PDF Viewer */}
              <PDFViewer product={product} />

              {/* Social Share */}
              <SocialShare />

              {/* Author Section */}
              <AuthorSection product={product} />

              {/* Comments Section */}
              <CommentForm />

              {/* Product Description */}
              <ProductDescription product={product} />

              {/* Tags */}
              <ProductTags product={product} />

            </div>

            {/* Right Sidebar (30% width) */}
            <div className="w-full lg:w-1/4">
              <Sidebar />
            </div>

          </div>
          
          {/* Related Products Section */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
    </div>
  );
}