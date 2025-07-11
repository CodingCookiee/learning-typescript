//? Generics
//? Generics allow you to create a component that can work over a variety of types, rather than a single one, which helps to make the component more reusable.

//? Let's go through an example to show you what that means...

//? The addID function accepts any object, and returns a new object with all the properties and values of the passed in object, plus an id property with random value between 0 and 1000. In short, it gives any object an ID.

 const addID = (obj: object) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });

console.log(person1.id); // 271
console.log(person1.name); // ERROR: Property 'name' does not exist on type '{ id: number; }'.

//? As you can see, TypeScript gives an error when we try to access the name property. This is because when we pass in an object to addID, we are not specifying what properties this object should have – so TypeScript has no idea what properties the object has (it hasn't "captured" them). So, the only property that TypeScript knows is on the returned object is id.

//? So, how can we pass in any object to addID, but still tell TypeScript what properties and values the object has? We can use a generic, <T> – where T is known as the type parameter:

//? <T> is just the convention - e.g. we could use <X> or <A>
const addID = <T>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};
//? What does this do? Well, now when we pass an object into addID, we have told TypeScript to capture the type – so T becomes whatever type we pass in. addID will now know what properties are on the object we pass in.

//? But, we now have a problem: anything can be passed into addID and TypeScript will capture the type and report no problem:

let person1 = addID({ name: 'John', age: 40 });
let person2 = addID('Sally'); // Pass in a string - no problem

console.log(person1.id); // 271
console.log(person1.name); // John

console.log(person2.id);
console.log(person2.name); // ERROR: Property 'name' does not exist on type '"Sally" & { id: number; }'.

//? When we passed in a string, TypeScript saw no issue. It only reported an error when we tried to access the name property. So, we need a constraint: we need to tell TypeScript that only objects should be accepted, by making our generic type, T, an extension of object:

const addID = <T extends object>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: 'John', age: 40 });
let person2 = addID('Sally'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'object'.
//? The error is caught straight away – perfect... well, not quite. In JavaScript, arrays are objects, so we can still get away with passing in an array:

let person2 = addID(['Sally', 26]); // Pass in an array - no problem

console.log(person2.id); // 824
console.log(person2.name); // Error: Property 'name' does not exist on type '(string | number)[] & { id: number; }'.

//? We could solve this by saying that the object argument should have a name property with string value:

const addID = <T extends { name: string }>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person2 = addID(['Sally', 26]); // ERROR: argument should have a name property with string value

//? The type can also be passed in to <T>, as below – but this isn't necessary most of the time, as TypeScript will infer it.

//? Below, we have explicitly stated what type the argument should be between the angle brackets.
let person1 = addID<{ name: string; age: number }>({ name: 'John', age: 40 });

//? Generics allow you to have type-safety in components where the arguments and return types are unknown ahead of time.

//? In TypeScript, generics are used when we want to describe a correspondence between two values. In the above example, the return type was related to the input type. We used a generic to describe the correspondence.

//? Another example: If we need a function that accepts multiple types, it is better to use a generic than the any type. Below shows the issue with using any:

function logLength(a: any) {
  console.log(a.length); // No error
  return a;
}

let hello = 'Hello world';
logLength(hello); // 11

let howMany = 8;
logLength(howMany); // undefined (but no TypeScript error - surely we want TypeScript to tell us we've tried to access a length property on a number!)
We could try using a generic:

function logLength<T>(a: T) {
  console.log(a.length); // ERROR: TypeScript isn't certain that `a` is a value with a length property
  return a;
}
//? At least we are now getting some feedback that we can use to tighten up our code.

//? Solution: use a generic that extends an interface that ensures every argument passed in has a length property:

interface hasLength {
  length: number;
}

function logLength<T extends hasLength>(a: T) {
  console.log(a.length);
  return a;
}

let hello = 'Hello world';
logLength(hello); // 11

let howMany = 8;
logLength(howMany); // Error: numbers don't have length properties

//? We could also write a function where the argument is an array of elements that all have a length property:

interface hasLength {
  length: number;
}

function logLengths<T extends hasLength>(a: T[]) {
  a.forEach((element) => {
    console.log(element.length);
  });
}

let arr = [
  'This string has a length prop',
  ['This', 'arr', 'has', 'length'],
  { material: 'plastic', length: 30 },
];

logLengths(arr);
// 29
// 4
// 30

//? Generics are an awesome feature of TypeScript!

//? Generics with interfaces
//? When we don't know what type a certain value in an object will be ahead of time, we can use a generic to pass in the type:

// The type, T, will be passed in
interface Person<T> {
  name: string;
  age: number;
  documents: T;
}

// We have to pass in the type of `documents` - an array of strings in this case
const person1: Person<string[]> = {
  name: 'John',
  age: 48,
  documents: ['passport', 'bank statement', 'visa'],
};

// Again, we implement the `Person` interface, and pass in the type for documents - in this case a string
const person2: Person<string> = {
  name: 'Delia',
  age: 46,
  documents: 'passport, P45',
};
