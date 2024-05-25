import { DeleteBulkProductRequest, ProductDataApiRequest } from "@/types";
import {
  MessageResponse,
  ProductBulkDeleteResponse,
  ProductRespone,
} from "@/types/api-types";
import { apiSlice } from "./apiSlice";

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
    getProducts: builder.query<ProductRespone, { storeId: string }>({
      query: ({ storeId }) => ({
        url: `product/${storeId}/products`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 60,
    }),
    bulkDeleteProducts: builder.mutation<
      ProductBulkDeleteResponse,
      DeleteBulkProductRequest
    >({
      query: ({ storeId, productsIds }) => ({
        url: `product/${storeId}/bulk-delete`,
        method: "POST",
        body: productsIds,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useBulkDeleteProductsMutation,
} = productApiSlice;
