import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./apiServices";

export interface Product {
  id: number;
  name: string;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}products` }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<Product, { name: string }>({
      query: (newProduct) => ({
        url: "",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (updatedProduct) => ({
        url: `/${updatedProduct.id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
