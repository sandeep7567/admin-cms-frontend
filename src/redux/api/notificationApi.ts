import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `notification/`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `notification/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useUpdateNotificationStatusMutation } =
  notificationApiSlice;
