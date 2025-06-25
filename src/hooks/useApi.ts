"use client";

import { useState, useEffect } from "react";
import { LoadingState } from "@/utils/api-types";
import { 
  fetchFromEndpoint,
  fetchUsers,
  fetchPosts,
  fetchComments,
  fetchTodos,
  fetchUserById,
  fetchPostById,
  fetchUserPosts,
  fetchPostComments
} from "@/utils/apiClients/api-client";

// ✅ Generic hook for API calls
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setLoading("loading");
      setError(null);

      try {
        const result = await apiFunction();

        if (!isCancelled) {
          setData(result);
          setLoading("success");
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setLoading("error");
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [...dependencies, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
}

// ✅ Advanced generic approach - ONE smart hook
type ApiEndpoint = "users" | "posts" | "comments" | "todos";

export function useEndpoint<T extends ApiEndpoint>(endpoint: T) {
  return useApi(() => fetchFromEndpoint(endpoint), [endpoint]);
}

// ✅ Specific hooks using proper imports (no more require!)
export function useUsers() {
  return useApi(fetchUsers, []); 
}

export function usePosts() {
  return useApi(fetchPosts, []); 
}

export function useComments() {
  return useApi(fetchComments, []); 
}

export function useTodos() {
  return useApi(fetchTodos, []); 
}

// ✅ Specific resource hooks
export function useUser(id: number) {
  return useApi(() => fetchUserById(id), [id]);
}

export function usePost(id: number) {
  return useApi(() => fetchPostById(id), [id]);
}

export function useUserPosts(userId: number) {
  return useApi(() => fetchUserPosts(userId), [userId]);
}

export function usePostComments(postId: number) {
  return useApi(() => fetchPostComments(postId), [postId]);
}
