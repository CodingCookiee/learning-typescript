function Sum(a: number, b: number): string {
  return `The sum of ${a} and ${b} is ${a + b}`;
}

const formatText = (text: string, upperCase?: boolean): string => {
  text = upperCase ? text.toUpperCase() : text.toLowerCase();
  return text;
};

const formattedAge = (age: number | string): string => {
  return typeof age === "number"
    ? `You are ${age} years old`
    : `You are ${parseInt(age)} years old`;
};

console.log(Sum(5, 10));
console.log(formatText("Hello World", true));
console.log(formattedAge(25));
console.log(formattedAge("30"));

//  User info
function getUserInfo(
  name: string,
  age: number,
  hobbies: string[],
  email?: string,
  isActive?: boolean,
): object {
  return {
    name,
    age,
    email: email || "Not provided",
    isActive: isActive || false,
    hobbies: hobbies.length > 0 ? hobbies : ["No hobbies listed"],
  };
}

console.log(
  getUserInfo("John Doe", 30,["Reading", "Traveling"], "jhondoe@gmail.com", false, )
);
  export { Sum, formatText, formattedAge, getUserInfo };