"use client";

import { useState, useEffect } from "react";
import { LoadingState } from "@/utils/api-types";

// Generic hook for API calls
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
    setLoading("idle");
    setRefetchTrigger((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
}

// Specific hooks for our API
export function useUsers() {
  const { fetchUsers } = require("@/utils/apiClients/api-client");
  return useApi(fetchUsers, []);
}

export function usePosts() {
  const { fetchPosts } = require("@/utils/apiClients/api-client");
  return useApi(fetchPosts, []);
}

export function useComments(postId: number) {
  const { fetchPostComments } = require("@/utils/apiClients/api-client");
  return useApi(() => fetchPostComments(postId), [postId]);
}

export function useTodos() {
  const { fetchTodos } = require("@/utils/apiClients/api-client");
  return useApi(fetchTodos, []);
}
