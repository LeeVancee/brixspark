import { redirect } from "next/navigation";
import HomePage from "@/components/HomePage";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.s as string;

  // 向后兼容：如果使用旧的搜索参数，重定向到新的搜索页面
  if (searchQuery) {
    redirect(`/search?q=${encodeURIComponent(searchQuery)}`);
  }

  // 显示首页
  return <HomePage />;
}
