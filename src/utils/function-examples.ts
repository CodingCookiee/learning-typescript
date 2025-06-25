// Your existing function-based approach
export async function fetchUsers(): Promise<User[]> {
  return fetchApi<User[]>("https://api.example.com/users");
}

// ✅ Now with advanced types - make it GENERIC and SMART
type ApiEndpoint = "users" | "posts" | "comments";

// Conditional type to determine return type based on endpoint
type EndpointData<T extends ApiEndpoint> = T extends "users"
  ? User[]
  : T extends "posts"
  ? Post[]
  : T extends "comments"
  ? Comment[]
  : never;

// Your function becomes type-safe for ANY endpoint
export async function fetchFromEndpoint<T extends ApiEndpoint>(
  endpoint: T
): Promise<EndpointData<T>> {
  return fetchApi<EndpointData<T>>(`https://api.example.com/${endpoint}`);
}

// Usage - TypeScript KNOWS the return type!
const users = await fetchFromEndpoint("users"); // TypeScript knows this is User[]
const posts = await fetchFromEndpoint("posts"); // TypeScript knows this is Post[]
const comments = await fetchFromEndpoint("comments"); // TypeScript knows this is Comment[]
