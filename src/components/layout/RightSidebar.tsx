import SearchWidget from "./SearchWidget";
import CategoriesWidget from "./CategoriesWidget";
import RecentPosts from "./RecentPosts";
import RecentComments from "./RecentComments";

export default function RightSidebar() {
  return (
    <aside className="w-full">
      {/* Search Widget */}
      <SearchWidget />

      {/* Categories Widget */}
      <CategoriesWidget />

      {/* Recent Posts */}
      <RecentPosts />

      {/* Recent Comments */}
      <RecentComments />
    </aside>
  );
}
