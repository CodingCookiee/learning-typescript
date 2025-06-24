
type UserCardProps = { 
    name: string;
    age: number;
    hobbies: string[];
    email?: string;
    isActive?: boolean;
}


export default function UserCard(
    { name, age, hobbies, email, isActive = false }: UserCardProps
) {
  return (
    <div className="p-4  rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-sm text-gray-600">Age: {age}</p>
      <p className="text-sm text-gray-600">Email: {email || "Not provided"}</p>
      <p className="text-sm text-gray-600">Active: {isActive ? "Yes" : "No"}</p>
      <p className="text-sm text-gray-600">
        Hobbies:{" "}
        {hobbies?.length > 0 ? hobbies?.join(", ") : "No hobbies listed"}
      </p>
    </div>
  );
}
