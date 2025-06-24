"use client";

import { useState } from "react";
import UserCard from "@/components/ui/client/UserCard";
import UsersList from "@/components/ui/client/UsersList";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"basics" | "api">("basics");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        TypeScript Real-World Examples
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("basics")}
          className={`pb-2 px-1 ${
            activeTab === "basics"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Basics Review
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`pb-2 px-1 ${
            activeTab === "api"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          API Integration
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "basics" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">TypeScript Basics Review</h2>
          <UserCard
            name="TypeScript Master"
            age={30}
            hobbies={["API Integration", "Type Safety", "Real-world Apps"]}
            email="master@typescript.com"
            isActive={true}
          />
        </div>
      )}

      {activeTab === "api" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Live API Data with TypeScript
          </h2>
          <UsersList />
        </div>
      )}
    </div>
  );
}
