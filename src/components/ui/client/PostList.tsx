"use client";

import { usePosts } from "@/hooks/useApi";
import { Post } from "@/utils/api-types";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2">Loading...</span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong>Error:</strong> {message}
    </div>
  );
}

// YOUR TASK: Create PostCard component
function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p className="text-gray-700 text-sm">
        {post.body.length > 100
          ? post.body.substring(0, 100) + "..."
          : post.body}
      </p>
      <p className="text-xs text-gray-500">By User: {post.userId}</p>
    </div>
  );
}

export default function PostsList() {
  const { data: posts, loading, error, refetch } = usePosts();

  if (loading === "loading") {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} />
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Handle empty state
  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500 p-8">No posts found</div>;
  }

  // Handle success state
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Posts ({posts.length})</h2>
        <button
          onClick={refetch}
          className="px-3 py-1 text-sm bg-gray-200 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
