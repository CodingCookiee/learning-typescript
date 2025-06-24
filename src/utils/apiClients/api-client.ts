import { ApiResponse, User, Post, ApiError, LoadingState } from "@/utils/api-types";

async function fetchApi<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

export async function fetchUsers(): Promise<User[]> {
  return fetchApi<User[]>(`https://jsonplaceholder.typicode.com/users`);
}

export async function fetchUser(id: number): Promise<User[]> {
  return fetchApi<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
}

export async function fetchPosts(): Promise<Post[]> {
  return fetchApi<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
}

export async function fetchUserPosts(userId: number): Promise<Post[]> {
  return fetchApi<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
}

export async function fetchPost(id: number): Promise<Post> {
  return fetchApi<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
}
