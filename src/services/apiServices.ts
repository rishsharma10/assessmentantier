const BASE_URL = "https://dummyjson.com/";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

// 🟢 Define Login Response
interface LoginResponse {
  token: string;
}


const apiRequest = async <T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: any
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};

export default apiRequest;


export const productService = {
  getAll: async (): Promise<Product[]> => apiRequest<Product[]>("/products"),
  getById: async (id: number): Promise<Product> => apiRequest<Product>(`/products/${id}`),
  create: async (product: Partial<Product>): Promise<Product> => apiRequest<Product>("/products/add", "POST", product),
  update: async (id: number, product: Partial<Product>): Promise<Product> => apiRequest<Product>(`/products/${id}`, "PUT", product),
  delete: async (id: number): Promise<{ message: string }> => apiRequest<{ message: string }>(`/products/${id}`, "DELETE"),
};

// 🔑 Authentication APIs
export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => 
    apiRequest<LoginResponse>("/auth/login", "POST", { username, password }),
};
