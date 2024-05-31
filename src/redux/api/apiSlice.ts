import { LogoutRequest, LogoutResponse } from "@/types/api-types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getUser, logout } from "../reducer/authSlice";
import { baseQueryWithReauth } from "./customBaseQuery";

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Store", "Product", "User", "Order"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "auth/self/admin",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            getUser({
              user: data?.user,
            })
          );
        } catch (err) {
          console.error(err);
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
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (data) => ({
        url: "auth/logout",
        body: data,
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useRefreshTokenQuery, useLogoutMutation } =
  apiSlice;
