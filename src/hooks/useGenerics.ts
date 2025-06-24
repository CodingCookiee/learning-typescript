//? Generics! They allow you to write reusable code that works with multiple types

function getLastItem<T>(items: T[]): T | undefined {
  return items ? items[items.length - 1] : undefined;
}

const filterArray = <T>(items: T[], predicate: (item: T) => boolean): T[] => {
  return items.filter(predicate);
};

const mapArray = <T, U>(items: T[], mapper: (item: T) => U): U[] => {
  return items.map(mapper);
};

console.log(getLastItem([1, 2, 3]));
console.log(getLastItem(["apple", "banana", "cherry"]));
console.log(getLastItem([]));
console.log(getLastItem([true, false, true]));
console.log(getLastItem([1, "two", true])); // Mixed types, still works
console.log(filterArray([1, 2, 3, 4], (item) => item > 2));
console.log(mapArray([1, 2, 3], (item) => item * 2));
