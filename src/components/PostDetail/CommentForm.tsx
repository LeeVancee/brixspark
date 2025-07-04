import { Button } from "@/components/ui/button";

export default function CommentForm() {
  return (
    <div className="p-4 mb-4" id="comments">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        Leave a Reply
      </h3>
      <form className="space-y-3">
        <div>
          <label
            htmlFor="comment"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Your comment..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="website"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            id="save-info"
            type="checkbox"
            className="h-3 w-3 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="save-info"
            className="ml-2 block text-xs text-gray-700"
          >
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>

        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 text-sm"
        >
          Post Comment
        </Button>
      </form>
    </div>
  );
}
