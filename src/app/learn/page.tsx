"use client";

import { useState } from "react";
import UserCard from "@/components/ui/client/UserCard";
import GenericList, { TodoList, ProductList } from "@/components/ui/client/GenericList";

export default function LearnPage() {
  // Sample data for generic components
  const todos = [
    { id: 1, title: "Learn TypeScript Generics", completed: true },
    { id: 2, title: "Build a TypeScript project", completed: false},
    { id: 3, title: "Master advanced types", completed: true },
  ];

 const products = [
  { id: 1, name: "TypeScript Course", price: 49.99 },
  { id: 2, name: "React Handbook", price: 29.99 },
  { id: 3, name: "Node.js Guide", price: 39.99 },
];

  const users = [
    { name: "Alice", role: "Developer" },
    { name: "Bob", role: "Designer" },
    { name: "Charlie", role: "Manager" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        TypeScript Generics & Advanced Types
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Generic Components</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-3 ">Todo List</h3>
              <TodoList todos={todos} />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Product List</h3>
              <ProductList products={products} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Generic List with Custom Data
          </h2>
          <GenericList
            items={users}
            renderItem={(user) => (
              <div className="flex justify-between">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>
            )}
            emptyMessage="No users found"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
           User Information Card
          </h2>
          <UserCard
            name="Generic Master"
            age={28}
            hobbies={["TypeScript", "Generics", "Advanced Types"]}
            email="generic@typescript.com"
            isActive={true}
          />
        </section>
      </div>
    </div>
  );
}
