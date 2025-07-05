import { Metadata } from "next";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/RightSidebar";
import { getPostBySlug, getAllPosts } from "@/lib/queries";
import { WordPressPost } from "@/lib/type";
import Link from "next/link";
import AuthorSection from "@/components/PostDetail/AuthorSection";
import SocialShare from "@/components/PostDetail/SocialShare";
import CommentForm from "@/components/PostDetail/CommentForm";
import RelatedProducts from "@/components/PostDetail/RelatedPosts";

import { decodeHtmlEntities } from "@/lib/utils";
import { Prose } from "@/components/craft";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface ProductPageProps {
  searchParams: SearchParams;
}

export async function generateMetadata({
  searchParams,
}: ProductPageProps): Promise<Metadata> {
  const params = await searchParams;
  const slug = params.slug as string;

  const product = await getPostBySlug(slug);
  if (!product) {
    return {
      title: "Post Not Found - BRIXSPARK",
    };
  }

  return {
    title: `${decodeHtmlEntities(product.title.rendered)} - BRIXSPARK`,
  };
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
            <Link href="/" className="text-blue-500 hover:text-blue-600">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  const decodedTitle = decodeHtmlEntities(product.title.rendered);

  // Get categories from WordPress post
  const categories = product._embedded?.["wp:term"]?.[0] || [];
  const primaryCategory = categories.length > 0 ? categories[0] : null;

  // Build breadcrumbs with WordPress categories
  const breadcrumbs = [
    { label: "HOME", href: "/" },
    ...(primaryCategory
      ? [
          {
            label: primaryCategory.name.toUpperCase(),
            href: `/category/${primaryCategory.slug}`,
            isActive: false,
          },
        ]
      : []),
    { label: decodedTitle.toUpperCase(), isActive: true },
  ];

  // Parallelize related products API call (this will be handled by Sidebar components)
  // Get more related products for pagination
  const relatedPostsResponse = await getAllPosts({
    per_page: 10, // 增加获取数量以支持分页
    orderby: "date",
    order: "desc",
  });
  const relatedPosts = relatedPostsResponse.posts.filter(
    (p: WordPressPost) => p.id !== product.id
  );

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
                  <div className="bg-blue-500 text-white text-center flex-1 flex items-center justify-center">
                    <div className="text-xs font-medium leading-none">
                      {new Date(product.date).toLocaleDateString("en", {
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>

                {/* Product Title */}

                <h1 className="text-4xl  font-bold text-blue-500 mb-10">
                  {decodedTitle}
                </h1>

                {/* Product Content */}
                <Prose
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
