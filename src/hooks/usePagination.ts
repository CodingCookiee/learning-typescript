"use client";

import { useState } from "react";
import { useApi } from "./useApi";
import { fetchApi } from "@/utils/apiClients/api-client";
import { Post } from "@/utils/api-types";

type PaginatedOptions = {
  page: number;
  limit: number;
  total?: number;
};

export function usePaginatedApi<T>(
  apiFunction: (page: number, limit: number) => Promise<T[]>,
  initialLimit = 10
) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const { data, loading, error, refetch } = useApi<T[]>(
    () => apiFunction(page, limit),
    [page, limit]
  );

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const gotoPage = (newPage: number) => setPage(newPage);

  return {
    data,
    loading,
    error,
    page,
    limit,
    total: data ? data.length : 0,
    nextPage,
    prevPage,
    gotoPage,
    setLimit, // Allow changing the limit dynamically
    refetch, // Refetch function to refresh data
  };
}

export function usePaginatedPosts(limit: number = 10) {
  const fetchPaginatedPosts = async (page: number, limit: number) => {
    const start = (page - 1) * limit;
    return fetchApi<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    );
  };
  return usePaginatedApi<Post>(fetchPaginatedPosts, limit);
}
