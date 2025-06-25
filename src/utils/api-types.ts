// Real-world API response types
export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
  success: boolean;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// API Error type
export type ApiError = {
  message: string;
  status: number;
  code?: string;
};

// Loading states
export type LoadingState = "idle" | "loading" | "success" | "error";

console.log("API types defined");
