import { User } from "@/types";
import { MessageResponse } from "@/types/api-types";
import { login, registration } from "../reducer/authSlice";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<MessageResponse, User>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            registration({
              data: response.data.id,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            login({
              data: response.data.id,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useRegistrationMutation } = authApiSlice;
