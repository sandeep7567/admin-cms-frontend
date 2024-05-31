import { useGetOrdersQuery } from "@/redux/api/orderApiSlice";

interface Query {
  storeId: string;
  pageIndex: number;
  pageSize: number;
}

export const useFetchOrders = (query: Query) => {
  const {
    data,
    isSuccess: isOdersSuccess,
    isError: isOdersError,
    isFetching: isOdersFetching,
    isLoading: isOdersLoading,
    error: ordersError,
  } = useGetOrdersQuery(query, {
    refetchOnMountOrArgChange: true,
    skip: !query.storeId || !query.pageIndex,
  });

  return {
    orders: data ? data.orders : [],
    orderPageInfo: data
      ? {
          totalDocs: data.totalDocs ? data.totalDocs * 2 : data.totalDocs,
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
    isOdersSuccess,
    isOdersError,
    isOdersFetching,
    isOdersLoading,
    ordersError,
  };
};
