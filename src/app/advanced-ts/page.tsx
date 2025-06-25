"use client";

import { useState } from "react";
import UserCard from "@/components/ui/client/UserCard";
import UsersList from "@/components/ui/client/UsersList";
import PostsList from "@/components/ui/client/PostList";
import TodosList from "@/components/ui/client/TodosList";

export default function AdvancedTsPage() {
  const [activeTab, setActiveTab] = useState<
    "basics" | "userList" | "postsList" | "todosList"
  >("basics");

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
          onClick={() => setActiveTab("userList")}
          className={`pb-2 px-1 ${
            activeTab === "userList"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          User List
        </button>
        <button
          onClick={() => setActiveTab("postsList")}
          className={`pb-2 px-1 ${
            activeTab === "postsList"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Posts List
        </button>
        <button
          onClick={() => setActiveTab("todosList")}
          className={`pb-2 px-1 ${
            activeTab === "todosList"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Todos List
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

      {activeTab === "userList" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">User List</h2>
          <UsersList />
        </div>
      )}

      {activeTab === "postsList" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Posts List</h2>
          <PostsList />
        </div>
      )}

      {activeTab === "todosList" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Todo List</h2>
          <TodosList />
        </div>
      )}
    </div>
  );
}
