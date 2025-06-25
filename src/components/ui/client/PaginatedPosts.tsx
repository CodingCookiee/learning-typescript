"use client";

import { usePaginatedPosts } from "@/hooks/usePagination";
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

function Pagination({
  page,
  limit,
  nextPage,
  prevPage,
  gotoPage,
  setLimit,
  hasMore = true,
}: {
  page: number;
  limit: number;
  nextPage: () => void;
  prevPage: () => void;
  gotoPage: (page: number) => void;
  setLimit: (limit: number) => void;
  hasMore?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <button
          disabled={page <= 1}
          onClick={prevPage}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="mx-2">Page {page}</span>

        <button
          disabled={!hasMore}
          onClick={nextPage}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>

        <label htmlFor="posts-per-page" className="sr-only">
          Posts per page
        </label>
        <select
          id="posts-per-page"
          aria-label="Posts per page"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="ml-4 px-3 py-1 text-sm bg-gray-200 rounded"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => gotoPage(1)}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          First
        </button>
      </div>
    </div>
  );
}

export default function PaginatedPosts() {
  const {
    data: posts,
    loading,
    error,
    page,
    limit,
    nextPage,
    prevPage,
    gotoPage,
    setLimit,
    refetch,
  } = usePaginatedPosts(5);

  if (loading === "loading") {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} />
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500 p-8">No posts found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Posts ({posts.length})</h2>
        <button
          onClick={refetch}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      <Pagination
        page={page}
        limit={limit}
        nextPage={nextPage}
        prevPage={prevPage}
        gotoPage={gotoPage}
        setLimit={setLimit}
        hasMore={posts.length === limit}
      />

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
