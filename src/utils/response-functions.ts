// Conditional types to handle different response shapes
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Extract data type from API response
type ExtractData<T> = T extends ApiResponse<infer U> ? U : never;

// Smart response handler function
export function handleApiResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success) {
    return response.data; // TypeScript knows this is T
  } else {
    console.error(response.error); // TypeScript knows this is string
    return null;
  }
}

// Usage with your existing API functions
export async function getUsersWithHandling(): Promise<User[] | null> {
  try {
    const response = await fetch("/api/users");
    const apiResponse: ApiResponse<User[]> = await response.json();

    return handleApiResponse(apiResponse); // TypeScript knows this returns User[] | null
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
}
