//  Generic react component to display any kind of data
type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
};

export default function GenericList<T>({
  items,
  renderItem,
  emptyMessage = "No items found",
  className = "",
}): React.ReactNode {
  if (!items || items.length === 0) {
    return (
      <div className={`text-center text-gray-500 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="p-4 border rounded shadow-sm">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <GenericList
      items={todos}
      renderItem={(todo) => {
        return (
          <div className="flex items-center justify-center gap-2 ">
            <span
              className={`text-lg ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <span
              className={`text-sm ${
                todo.completed ? "text-green-500" : "text-red-500"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>
        );
      }}
      emptyMessage="No todos found"
    />
  );
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <GenericList
      items={products}
      renderItem={(product) => {
        return (
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{product.name}</span>
            <span className="text-green-500">${product.price.toFixed(2)}</span>
          </div>
        );
      }}
      emptyMessage="No products found"
    />
  );
}
