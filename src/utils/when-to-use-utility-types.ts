interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  createdAt: Date;
}

// 🎯 OMIT - When you want "everything except..."
type CreateProductData = Omit<Product, "id" | "createdAt">;
// Use: API calls where server generates ID and timestamp

// 🎯 PICK - When you want "only these specific fields"
type ProductSummary = Pick<Product, "id" | "name" | "price">;
// Use: Lists, cards, search results

// 🎯 PARTIAL - When you want "some or all fields optional"
type UpdateProductData = Partial<Product>;
// Use: Update operations, form data

// Real examples:
function createProduct(data: CreateProductData): Product {
  return {
    id: Math.random().toString(),
    createdAt: new Date(),
    ...data,
  };
}

function updateProduct(id: string, data: UpdateProductData): Product {
  // Only update provided fields
  const existing = getProductById(id);
  return { ...existing, ...data };
}

function displayProductCard(product: ProductSummary) {
  // Only needs basic info for display
  return `${product.name} - $${product.price}`;
}

// Mock function
function getProductById(id: string): Product {
  return {} as Product;
}

export { CreateProductData, ProductSummary, UpdateProductData };
