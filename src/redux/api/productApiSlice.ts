import {
  DeleteBulkRequest,
  DeleteProductRequest,
  ProductDataApiRequest,
} from "@/types";
import {
  BulkDeleteResponse,
  MessageResponse,
  ProductResponse,
  ProductsResponse,
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
    getProducts: builder.query<
      ProductsResponse,
      { storeId: string; pageIndex: number; pageSize: number }
    >({
      query: ({ storeId, ...params }) => ({
        url: `product/${storeId}/products`,
        method: "GET",
        credentials: "include" as const,
        params,
      }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query<ProductResponse, { productId?: string }>({
      query: ({ productId }) => ({
        url: `product/${productId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Product"],
    }),
    bulkDeleteProducts: builder.mutation<BulkDeleteResponse, DeleteBulkRequest>(
      {
        query: ({ storeId, deleteIds }) => ({
          url: `product/${storeId}/bulk-delete`,
          method: "POST",
          body: deleteIds,
          credentials: "include",
        }),
        invalidatesTags: ["Product"],
      }
    ),
    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ storeId, productId }) => ({
        url: `product/${storeId}/${productId}`,
        method: "DELETE",
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
  useGetProductQuery,
  useBulkDeleteProductsMutation,
  useDeleteProductMutation,
} = productApiSlice;
