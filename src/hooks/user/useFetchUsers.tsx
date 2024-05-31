import { useGetUsersQuery } from "@/redux/api/userApiSlice";

interface Query {
  storeId: string;
  pageIndex: number;
  pageSize: number;
}

export const useFetchUsers = (query: Query) => {
  const {
    data,
    isSuccess: isUsersSuccess,
    isError: isUsersError,
    isFetching: isUsersFetching,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUsersQuery(query, {
    pollingInterval: 3600000, // 1 hr
    refetchOnMountOrArgChange: true,
    skip: !query?.storeId || !query?.pageIndex,
  });

  return {
    users: data ? data.users : [],
    userPageInfo: data
      ? {
          totalDocs: data.totalDocs,
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          pageCount: data.pageCount,
        }
      : {
          totalDocs: 10,
          pageIndex: 1,
          pageSize: 10,
          pageCount: 4,
        },
    isUsersSuccess,
    isUsersError,
    isUsersFetching,
    isUsersLoading,
    usersError,
  };
};
