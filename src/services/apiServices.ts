import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDetail } from "../interface/Product";
export const API_BASE_URL = 'https://dummyjson.com/'

export interface Product extends ProductDetail {
  id: number;
  name: string;
}

export const apiServices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<Product, { title: string }>({
      query: (newProduct) => ({
        url: "/products/add",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (updatedProduct) => ({
        url: `/products/${updatedProduct.id}`,
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/products/${id}`,
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
} = apiServices;
