import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../services/apiServices";

// Define Product Type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

// Define Initial State
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async Thunks for API Calls
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
//   return await getProducts();
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (id: number) => {
//   return await getProductById(id);
});

export const addProduct = createAsyncThunk("products/add", async (product: Partial<Product>) => {
//   return await createProduct(product);
});

export const editProduct = createAsyncThunk("products/edit", async ({ id, product }: { id: number; product: Partial<Product> }) => {
//   return await updateProduct(id, product);
});

export const removeProduct = createAsyncThunk("products/delete", async (id: number) => {
//   await deleteProduct(id);
  return id; // Return ID to remove from state
});

// Create Product Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
    //   .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
    //     state.loading = false;
    //     state.products = action.payload;
    //   })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

    //   // Add Product
    //   .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
    //     state.products.push(action.payload);
    //   })

      // Edit Product
    //   .addCase(editProduct.fulfilled, (state, action: PayloadAction<Product>) => {
    //     state.products = state.products.map((product) =>
    //       product.id === action.payload.id ? action.payload : product
    //     );
    //   })

      // Delete Product
      .addCase(removeProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
