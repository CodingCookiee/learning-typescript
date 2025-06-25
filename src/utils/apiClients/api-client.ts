import {
  ApiResponse,
  User,
  Post,
  Comment,
  Todo,
  ApiError,
  LoadingState,
} from "@/utils/api-types";

// ✅ Single fetchApi function
export async function fetchApi<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: "Request failed",
        status: response.status,
      }));
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

// ✅ Advanced generic approach
type ApiEndpoint = "users" | "posts" | "comments" | "todos";

type EndpointData<T extends ApiEndpoint> = T extends "users"
  ? User[]
  : T extends "posts"
  ? Post[]
  : T extends "comments"
  ? Comment[]
  : T extends "todos"
  ? Todo[]
  : never;

export async function fetchFromEndpoint<T extends ApiEndpoint>(
  endpoint: T
): Promise<EndpointData<T>> {
  return fetchApi<EndpointData<T>>(
    `https://jsonplaceholder.typicode.com/${endpoint}`
  );
}

// ✅ Add these specific functions that your hooks are looking for
export async function fetchUsers(): Promise<User[]> {
  return fetchApi<User[]>(`https://jsonplaceholder.typicode.com/users`);
}

export async function fetchPosts(): Promise<Post[]> {
  return fetchApi<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
}

export async function fetchComments(): Promise<Comment[]> {
  return fetchApi<Comment[]>(`https://jsonplaceholder.typicode.com/comments`);
}

export async function fetchTodos(): Promise<Todo[]> {
  return fetchApi<Todo[]>(`https://jsonplaceholder.typicode.com/todos`);
}

// ✅ Specific resource functions
export async function fetchUserById(id: number): Promise<User> {
  return fetchApi<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
}

export async function fetchPostById(id: number): Promise<Post> {
  return fetchApi<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
}

export async function fetchUserPosts(userId: number): Promise<Post[]> {
  return fetchApi<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
}

export async function fetchPostComments(postId: number): Promise<Comment[]> {
  return fetchApi<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
}

// ✅ Pagination function
export async function fetchPaginatedPosts(
  page: number,
  limit: number
): Promise<Post[]> {
  const start = (page - 1) * limit;
  return fetchApi<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  );
}
