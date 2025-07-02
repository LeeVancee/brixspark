import SearchWidget from "./SearchWidget";
import RecentPosts from "./RecentPosts";
import RecentComments from "./RecentComments";

export default function RightSidebar() {
  return (
    <aside className="w-full">
      {/* Search Widget */}
      <SearchWidget />
      
      {/* Recent Posts */}
      <RecentPosts />
      
      {/* Recent Comments */}
      <RecentComments />
    </aside>
  );
} 