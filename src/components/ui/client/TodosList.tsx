"use client";

import { useTodos, useEndpoint } from "@/hooks/useApi";
import { Todo } from "@/utils/api-types";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2">Loading...</span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong>Error:</strong> {message}
    </div>
  );
}

function TodoCard({ todo }): { todo: Todo } {
  return (
    <div className="flex items-center justify-between gap-5 p-4 border rounded shadow-sm">
      <h3
        className={`text-lg font-bold ${todo.completed ? "line-through" : ""}`}
      >
        {todo.title}
      </h3>
      <span
        className={`text-sm  ${
          todo.completed ? "text-green-500" : "text-gray-500"
        }`}
      >
        {todo.completed ? "Completed" : "Pending"}
      </span>
    </div>
  );
}

export default function TodoList() {
  // const { data: todos, loading, error, refetch } = useTodos();
  const { data: todos, loading, error, refetch } = useEndpoint("todos");

  if (loading === "loading") {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} />
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return <div className="text-center text-gray-500 p-8">No todos found</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
