import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUser } from "../reducer/authSlice";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["Auth", "Product", "User", "Order"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "auth/self",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          data && data?.statusCode === 200 && dispatch(getUser(data?.data));
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: ["Auth"],
      keepUnusedDataFor: 5,
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetUserQuery, useRefreshTokenQuery, useLogoutMutation } =
  apiSlice;