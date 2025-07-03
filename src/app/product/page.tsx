import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/RightSidebar";
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
  const slug =
    (params.slug as string) || "21358-minifigure-vending-machine-p90701";

  // Get product by slug from WordPress API
  const product = await getPostBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The requested product could not be found.
            </p>
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
    {
      label: product.title.rendered.toUpperCase(),
      href: `/product?slug=${product.slug}`,
    },
    { label: "母接式", isActive: false },
    { label: product.title.rendered.toUpperCase(), isActive: true },
  ];

  // Parallelize related products API call (this will be handled by Sidebar components)
  // Only get related products for the main content area
  const relatedPostsResponse = await getAllPosts({
    per_page: 4,
    orderby: "date",
    order: "desc",
  });
  const relatedProducts = relatedPostsResponse.posts
    .filter((p: WordPressPost) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Page Header with Breadcrumb and Title */}
      <PageHeader title={product.title.rendered} breadcrumbs={breadcrumbs} />

      {/* Main Content */}
      <main className="flex-1 pb-12">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 w-full">
              {/* Product Content with Date Label */}
              <div className="relative bg-white rounded-lg shadow-sm p-4 mb-4">
                {/* Date Label positioned at top-left */}
                <div className="absolute -top-2 -left-12 bg-white border border-gray-200 rounded-md overflow-hidden w-[40px] h-[70px] shadow-sm flex flex-col z-10">
                  <div className="bg-gray-100 text-gray-800 text-center flex-1 flex items-center justify-center">
                    <div className="text-lg font-bold leading-none">
                      {new Date(product.date)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white text-center flex-1 flex items-center justify-center">
                    <div className="text-xs font-medium leading-none">
                      {new Date(product.date).toLocaleDateString("en", {
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>

                {/* Product Title */}

                <h1 className="text-4xl  font-bold text-blue-600 mb-10">
                  {product.title.rendered}
                </h1>

                {/* Product Content */}
                <div
                  className="prose prose-base max-w-none"
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
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct: WordPressPost) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {relatedProduct._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url && (
                      <div className="relative w-full h-36">
                        <Image
                          src={
                            relatedProduct._embedded["wp:featuredmedia"][0]
                              .source_url
                          }
                          alt={relatedProduct.title.rendered}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
                        {relatedProduct.title.rendered}
                      </h3>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {relatedProduct.excerpt.rendered.replace(
                          /<[^>]*>/g,
                          ""
                        )}
                      </p>
                      <Link
                        href={`/product?slug=${relatedProduct.slug}`}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
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
