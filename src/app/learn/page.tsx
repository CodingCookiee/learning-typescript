import {
  favProgrammingLanguage,
  yearsOfExperience,
  isTypescriptAwesome,
  jsFrameworks,
} from "@/hooks/useBasics";
import UserCard from "@/components/ui/client/UserCard";

export default function LearnPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        TypeScript Learning Playground
      </h1>
      <div className="space-y-4">
        <div className=" p-4 rounded">
          <h2 className="font-semibold">Basic Types Example:</h2>
          <p className="text-sm">
            <strong>Favorite Programming Language:</strong>{" "}
            {favProgrammingLanguage}
          </p>
          <p className="text-sm">
            <strong>Years of Experience:</strong> {yearsOfExperience}
          </p>
          <p className="text-sm">
            <strong>Is TypeScript Awesome?</strong>{" "}
            {isTypescriptAwesome ? "Yes" : "No"}
          </p>
          <p className="text-sm">
            <strong>JavaScript Frameworks:</strong> {jsFrameworks.join(", ")}
          </p>
        </div>

        <div className="p-4 rounded">
          <h2 className="font-semibold">Typed React Components</h2>
          {/* UserInfo Card */}
          <UserCard
            name="John Doe"
            age={30}
            hobbies={["Reading", "Traveling"]}
            email="janedoe@gmail.com"
            isActive={true}
          />
        </div>
      </div>
    </div>
  );
}
