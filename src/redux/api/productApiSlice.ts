import { MessageResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";
import { ProductDataApiRequest } from "@/types";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<MessageResponse, ProductDataApiRequest>({
      query: ({ storeId, formData }) => ({
        url: `product/${storeId}`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<MessageResponse, ProductDataApiRequest>({
      query: ({ storeId, productId, formData }) => ({
        url: `product/${storeId}/${productId}`,
        method: "PATCH",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useCreateProductMutation, useUpdateProductMutation } =
  productApiSlice;
