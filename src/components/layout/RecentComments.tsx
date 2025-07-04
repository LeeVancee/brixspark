import Link from "next/link";

export default function RecentComments() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">RECENT COMMENTS</h3>
      <div className="text-sm">
        <div className="flex items-start gap-1 flex-wrap">
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-500 transition-colors font-medium"
          >
            A WordPress Commenter
          </Link>
          <span className="text-gray-500">on Hello world!</span>
        </div>
      </div>
    </div>
  );
}
