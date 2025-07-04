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
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";

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
  // Decode HTML entities in title

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
  const decodeHtmlEntities = (text: string) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  };

  const decodedTitle = decodeHtmlEntities(product.title.rendered);

  // Build breadcrumbs
  const breadcrumbs = [
    { label: "HOME", href: "/" },
    {
      label: decodedTitle.toUpperCase(),
      href: `/product?slug=${product.slug}`,
    },
    { label: "母接式", isActive: false },
    { label: decodedTitle.toUpperCase(), isActive: true },
  ];

  // Parallelize related products API call (this will be handled by Sidebar components)
  // Only get related products for the main content area
  const relatedPostsResponse = await getAllPosts({
    per_page: 4,
    orderby: "date",
    order: "desc",
  });
  const relatedPosts = relatedPostsResponse.posts
    .filter((p: WordPressPost) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Page Header with Breadcrumb and Title */}
      <PageHeader title={decodedTitle} breadcrumbs={breadcrumbs} />

      {/* Main Content */}
      <main className="flex-1  pb-12">
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
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
                  {decodedTitle}
                </h1>

                {/* Product Content */}
                <div
                  className="prose prose-base max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: product.content.rendered }}
                />

                {/* Author Section */}
                <div className="mt-8">
                  <AuthorSection product={product} />
                </div>

                {/* Social Share */}
                <div className="mt-8">
                  <SocialShare />
                </div>

                {/* Comment Form */}
                <div className="mt-8">
                  <CommentForm />
                </div>

                {/* Related Posts Section - aligned with main content */}
                <div className="mt-12">
                  <RelatedProducts posts={relatedPosts} />
                </div>
              </div>
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
