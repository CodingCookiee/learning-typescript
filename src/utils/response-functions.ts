//? Conditional types to handle different response shapes
// This is a union type with two possible shapes
// Either { success: true; data: T } OR { success: false; error: string }
// TypeScript knows which properties are available based on the success field
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

//   ? Example usage of ApiResponse:
// ✅ Valid responses
const successResponse: ApiResponse<User[]> = {
  success: true,
  data: [{ id: 1, name: "John", email: "john@test.com" /* ... */ }],
};

const errorResponse: ApiResponse<User[]> = {
  success: false,
  error: "Failed to fetch users",
};

// ❌ Invalid - TypeScript will catch these
// const invalid1: ApiResponse<User[]> = {
//   success: true,
//   error: "Can't have error when success is true"
// };

// const invalid2: ApiResponse<User[]> = {
//   success: false,
//   data: []  // Can't have data when success is false
// };

//? Extract data type from API response: Conditional Type Magic (Type Extraction)
// T extends ApiResponse<infer U> - "If T is an ApiResponse of some type U"
// infer U - "Figure out what U is and capture it"
//  ? U : never - "If yes, return U, otherwise return never"
type ExtractData<T> = T extends ApiResponse<infer U> ? U : never;

// Example usage of ExtractData:
type UserResponseData = ExtractData<ApiResponse<User[]>>; // Result: User[]
type PostResponseData = ExtractData<ApiResponse<Post>>; // Result: Post
type NotApiResponse = ExtractData<string>; // Result: never

//? Smart response handler function
// TypeScript uses the if (response.success) check as a type guard
// Inside the if block, TypeScript knows response has the { success: true; data: T } shape
// Inside the else block, TypeScript knows response has the { success: false; error: string } shape
export function handleApiResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success) {
    return response.data; // TypeScript knows this is T
  } else {
    console.error(response.error); // TypeScript knows this is string
    return null;
  }
}

//? Usage with your existing API functions
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
