// Instead of writing separate functions for each field...

// ❌ Old way - lots of repetition
export function handleNameChange(value: string) {
  /* ... */
}
export function handleEmailChange(value: string) {
  /* ... */
}
export function handleAgeChange(value: number) {
  /* ... */
}

// ✅ New way - ONE smart function with advanced types
type FormField<T, K extends keyof T> = {
  field: K;
  value: T[K];
  validate?: (value: T[K]) => boolean;
};

export function handleFieldChange<T, K extends keyof T>(
  formData: T,
  field: K,
  value: T[K]
): T {
  return {
    ...formData,
    [field]: value,
  };
}

// Usage - TypeScript prevents mistakes!
const user = { name: "John", email: "john@test.com", age: 30 };

const updated1 = handleFieldChange(user, "name", "Jane"); // ✅ Works
const updated2 = handleFieldChange(user, "age", 25); // ✅ Works
// const updated3 = handleFieldChange(user, 'age', 'invalid'); // ❌ TypeScript error!
// const updated4 = handleFieldChange(user, 'invalid', 'test'); // ❌ TypeScript error!
