import { UsersResponse } from "@/types/api-types";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      UsersResponse,
      { storeId: string; pageIndex: number; pageSize: number }
    >({
      query: ({ storeId, ...params }) => ({
        url: `user/${storeId}`,
        method: "GET",
        credentials: "include" as const,
        params,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
