"use client";

import { useState } from "react";
import { useEndpoint } from "@/hooks/useApi";
import { User, Post, Comment, Todo } from "@/utils/api-types";

type ApiEndpoint = "users" | "posts" | "comments" | "todos";

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

// ✅ Type-safe rendering components
function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3 className="font-semibold">{user.name || "Unknown User"}</h3>
      <p className="text-sm text-gray-600">{user.email || "No email"}</p>
      <p className="text-xs text-gray-500">@{user.username || "no-username"}</p>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div>
      <h3 className="font-semibold">{post.title || "Untitled Post"}</h3>
      <p className="text-sm text-gray-600">
        {post.body && post.body.length > 100
          ? post.body.substring(0, 100) + "..."
          : post.body || "No content"}
      </p>
      <p className="text-xs text-gray-500">By User: {post.userId}</p>
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div>
      <h3 className="font-semibold">{comment.name || "Anonymous"}</h3>
      <p className="text-sm text-gray-600">
        {comment.body && comment.body.length > 100
          ? comment.body.substring(0, 100) + "..."
          : comment.body || "No comment"}
      </p>
      <p className="text-xs text-gray-500">{comment.email || "No email"}</p>
    </div>
  );
}

function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div>
      <h3 className="font-semibold">{todo.title || "Untitled Todo"}</h3>
      <p className="text-sm">
        Status: {todo.completed ? "✅ Completed" : "❌ Pending"}
      </p>
      <p className="text-xs text-gray-500">User: {todo.userId}</p>
    </div>
  );
}

// ✅ Type guard functions
function isUserArray(data: any[], endpoint: string): data is User[] {
  return endpoint === "users";
}

function isPostArray(data: any[], endpoint: string): data is Post[] {
  return endpoint === "posts";
}

function isCommentArray(data: any[], endpoint: string): data is Comment[] {
  return endpoint === "comments";
}

function isTodoArray(data: any[], endpoint: string): data is Todo[] {
  return endpoint === "todos";
}

export default function DynamicDataFetcher() {
  const [selectedEndpoint, setSelectedEndpoint] =
    useState<ApiEndpoint>("users");

  // ✅ ONE hook that adapts to different endpoints
  // TypeScript KNOWS the return type based on the endpoint!
  const { data, loading, error } = useEndpoint(selectedEndpoint);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Dynamic Data Fetcher</h2>

      {/* User can choose what data to fetch */}
      <select
        value={selectedEndpoint}
        onChange={(e) => setSelectedEndpoint(e.target.value as ApiEndpoint)}
        className="mb-4 p-2 border rounded"
        aria-label="Select data endpoint"
      >
        <option value="users">Users</option>
        <option value="posts">Posts</option>
        <option value="comments">Comments</option>
        <option value="todos">Todos</option>
      </select>

      {loading === "loading" && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {/* ✅ Type-safe rendering with proper null checks */}
      {data && Array.isArray(data) && data.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Found {data.length} {selectedEndpoint}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className="p-4 border rounded shadow-sm"
              >
                {/* ✅ Type-safe rendering based on endpoint */}
                {isUserArray(data, selectedEndpoint) && (
                  <UserCard user={item} />
                )}
                {isPostArray(data, selectedEndpoint) && (
                  <PostCard post={item} />
                )}
                {isCommentArray(data, selectedEndpoint) && (
                  <CommentCard comment={item} />
                )}
                {isTodoArray(data, selectedEndpoint) && (
                  <TodoCard todo={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Handle empty data */}
      {data && Array.isArray(data) && data.length === 0 && (
        <div className="text-center text-gray-500 p-8">
          No {selectedEndpoint} found
        </div>
      )}
    </div>
  );
}
