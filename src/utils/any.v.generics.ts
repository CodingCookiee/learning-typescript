// ❌ Using 'any' - loses all type safety
function badFunction(items: any[]): any {
  return items[0];
}

const result1 = badFunction([1, 2, 3]);
// TypeScript thinks result1 is 'any' - no autocomplete, no error checking
result1.toUpperCase(); // No error, but will crash at runtime!

// ✅ Using generics - maintains type safety
function goodFunction<T>(items: T[]): T | undefined {
  return items[0];
}

const result2 = goodFunction([1, 2, 3]);
// TypeScript knows result2 is 'number | undefined'
// result2.toUpperCase(); // ❌ TypeScript catches this error!

console.log("Generic result:", result2);

// ? Key difference: any = "I don't care about types" vs <T> = "I care about types, but let the caller decide"
