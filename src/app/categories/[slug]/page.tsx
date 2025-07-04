import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/layout/PostCard";
import RightSidebar from "@/components/layout/RightSidebar";
import { getCategories, getPostsBySearch } from "@/lib/queries";
import { WordPressCategory, WordPressPost } from "@/lib/type";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const categoriesResult = await getCategories();
    const category = categoriesResult.categories.find(
      (cat) => cat.slug === slug
    );

    if (!category) {
      return {
        title: "Category Not Found - BRIXSPARK",
      };
    }

    return {
      title: `${category.name} - BRIXSPARK`,
    };
  } catch (error) {
    return {
      title: "Categories - BRIXSPARK",
    };
  }
}

// 分页组件（复用搜索页逻辑）
function Pagination({
  currentPage,
  totalPages,
  categorySlug,
}: {
  currentPage: number;
  totalPages: number;
  categorySlug: string;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);
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
      {currentPage > 1 && (
        <Link
          href={`/categories/${categorySlug}?page=${currentPage - 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </Link>
      )}
      {getPageNumbers().map((page) => (
        <Link
          key={page}
          href={`/categories/${categorySlug}?page=${page}`}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? "text-white bg-blue-500 border border-blue-500"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`/categories/${categorySlug}?page=${currentPage + 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const { slug } = params;

  const searchParams = await props.searchParams;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  // 获取所有分类，查找当前slug对应的分类ID和名称
  const categoriesResult = await getCategories();
  const category = categoriesResult.categories.find((cat) => cat.slug === slug);
  if (!category) {
    notFound();
  }

  // 获取该分类下的文章
  const postsResult = await getPostsBySearch("", {
    per_page: 12,
    page: currentPage,
    categories: String(category.id),
    orderby: "date",
  });

  const { posts, totalPages, totalPosts } = postsResult;
  const error =
    totalPosts === 0 &&
    posts.length === 0 &&
    currentPage > totalPages &&
    totalPages > 0
      ? "No posts on this page"
      : null;

  const breadcrumbs = [
    { label: "HOME", href: "/" },
    { label: "CATEGORIES", href: "/categories" },
    { label: category.name, isActive: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <PageHeader title={category.name} breadcrumbs={breadcrumbs} />
      <main className="flex-1 pb-12">
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧内容区 */}
            <div className="flex-1 w-full lg:w-3/4">
              <div className="mb-4">
                {error ? (
                  <p className="text-red-600">{error}</p>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Found {totalPosts} post{totalPosts !== 1 ? "s" : ""} in
                    &ldquo;{category.name}&rdquo;
                    {totalPages > 1 && (
                      <span className="ml-2">
                        (Page {currentPage} of {totalPages})
                      </span>
                    )}
                  </p>
                )}
              </div>
              {posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                      <PostCard key={post.id} product={post} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    categorySlug={slug}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    No posts found in &ldquo;{category.name}&rdquo;
                  </p>
                </div>
              )}
            </div>
            {/* 右侧边栏 */}
            <div className="w-full lg:w-1/4">
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
