import HomePage from "@/components/HomePage";
import SearchResults from "@/components/SearchResults";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.s as string;
  console.log(params);

  // 如果有搜索参数，显示搜索结果页面
  if (searchQuery) {
    return <SearchResults query={searchQuery} />;
  }

  // 否则显示首页
  return <HomePage />;
}
