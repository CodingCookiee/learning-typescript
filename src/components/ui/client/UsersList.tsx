"use client";

import { useUsers } from "@/hooks/useApi";
import { User } from "@/utils/api-types";
import { useEndpoint } from "@/hooks/useApi";

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2">Loading...</span>
    </div>
  );
}

// Error component
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong>Error:</strong> {message}
    </div>
  );
}

// User card component
function UserCard({ user }: { user: User }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-blue-600">{user.name}</h3>
      <p className="text-gray-600">@{user.username}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
      <p className="text-sm text-gray-500">{user.phone}</p>
      <div className="mt-2 text-xs text-gray-400">
        {user.address.city}, {user.address.zipcode}
      </div>
      {user.website && (
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline"
        >
          Visit Website
        </a>
      )}
    </div>
  );
}

// Main component
export default function UsersList() {
  // const { data: users, loading, error, refetch } = useUsers();
  const { data: users, loading, error, refetch } = useEndpoint("users");
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

  if (!users || users.length === 0) {
    return <div className="text-center text-gray-500 p-8">No users found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users ({users.length})</h2>
        <button
          onClick={refetch}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
