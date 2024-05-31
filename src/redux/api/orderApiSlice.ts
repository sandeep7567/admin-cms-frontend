import {
  DeleteBulkRequest,
  DeleteOrderRequest,
  OrdersDataApiRequest,
} from "@/types";
import {
  BulkDeleteResponse,
  MessageResponse,
  OrderResponse,
  OrdersResponse,
} from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateOrder: builder.mutation<MessageResponse, OrdersDataApiRequest>({
      query: ({ storeId, orderId, ...data }) => ({
        url: `order/${storeId}/${orderId}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query<
      OrdersResponse,
      { storeId: string; pageIndex: number; pageSize: number }
    >({
      query: ({ storeId, ...params }) => ({
        url: `order/${storeId}`,
        method: "GET",
        credentials: "include" as const,
        params,
      }),
      providesTags: ["Order"],
    }),
    getOrder: builder.query<OrderResponse, { orderId?: string }>({
      query: ({ orderId }) => ({
        url: `order/${orderId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Order"],
    }),
    bulkDeleteOrders: builder.mutation<BulkDeleteResponse, DeleteBulkRequest>({
      query: ({ storeId, deleteIds }) => ({
        url: `order/${storeId}/bulk-delete`,
        method: "POST",
        body: deleteIds,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<MessageResponse, DeleteOrderRequest>({
      query: ({ storeId, orderId }) => ({
        url: `order/${storeId}/${orderId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useUpdateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useBulkDeleteOrdersMutation,
  useDeleteOrderMutation,
} = orderApiSlice;
