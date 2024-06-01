import { useGetStoresQuery } from "@/redux/api/storeApiSlice";

export const useFetchStores = (id: { userId: string }) => {
  const {
    data,
    isSuccess: isStoresSuccess,
    isError: isStoresError,
    isFetching: isStoresFetching,
    isLoading: isStoresLoading,
    error: storesError,
  } = useGetStoresQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id.userId,
  });

  return {
    stores: data?.stores,
    isStoresSuccess,
    isStoresError,
    isStoresFetching,
    isStoresLoading,
    storesError: storesError ?? null, // Ensure storesError is never undefined
  };
};
