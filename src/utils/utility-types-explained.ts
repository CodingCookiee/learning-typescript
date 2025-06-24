// Original interface
type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  isActive: boolean;
};

// 1. OMIT - "Remove these properties"
type CreateUser = Omit<User, "id">;
// Result: { name: string; email: string; age: number; password: string; isActive: boolean; }
// Use case: When creating a user, ID is auto-generated

// 2. PICK - "Keep only these properties"
type UserProfile = Pick<User, "name" | "email" | "age">;
// Result: { name: string; email: string; age: number; }
// Use case: Public profile without sensitive data

// 3. PARTIAL - "Make all properties optional"
type UpdateUser = Partial<User>;
// Result: { id?: string; name?: string; email?: string; age?: number; password?: string; isActive?: boolean; }
// Use case: When updating, you might only change some fields

// Real-world examples:
const newUser: CreateUser = {
  name: "John",
  email: "john@example.com",
  age: 30,
  password: "secret123",
  isActive: true,
  // No 'id' needed - it's omitted!
};

const publicProfile: UserProfile = {
  name: "John",
  email: "john@example.com",
  age: 30,
  // Only these 3 properties allowed
};

const userUpdate: UpdateUser = {
  name: "John Updated",
  // All other properties are optional
};

console.log("New user:", newUser);
console.log("Public profile:", publicProfile);
console.log("User update:", userUpdate);

// 4. RECORD - Create object type with specific keys and values
type UserRoles = Record<"admin" | "user" | "guest", string[]>;
// Result: { admin: string[]; user: string[]; guest: string[]; }

const permissions: UserRoles = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

console.log("Permissions:", permissions);
