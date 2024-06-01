import { OrderColumns } from "@/components/columns/orderColumns";
import NoDataPage from "@/components/layout/NoDataPage";
import { DataTable } from "@/components/ui/data-table";
import { Loader } from "@/components/ui/loader";
import { OpenSheetButton } from "@/components/ui/open-sheet-button";
import { useBulkDeleteOrders } from "@/hooks/order/useBulkDelete";
import { useFetchOrders } from "@/hooks/order/useFetchOrders";
import { Count } from "@/types";
import { PaginationState } from "@tanstack/react-table";

import { useState } from "react";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const { storeId } = useParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Count.ZERO,
    pageSize: Count.ORDER_PAGE_SIZE,
  });

  const {
    orders,
    orderPageInfo: { pageCount, pageIndex, totalDocs },
    isOdersLoading,
    isOdersFetching,
    isOdersSuccess,
    isOdersError,
  } = useFetchOrders({
    storeId: String(storeId),
    pageIndex: pagination.pageIndex + Count.PAGE_INDEX,
    pageSize: pagination.pageSize,
  });

  const { deleteBulkOrders, isLoading } = useBulkDeleteOrders();

  const isDisabled = isOdersLoading || isLoading;

  if (isOdersLoading || isOdersFetching || isOdersError) {
    return <Loader />;
  }

  return (
    <>
      {isOdersSuccess && !orders.length && (
        <NoDataPage
          description="You have no orders"
          info="You can start selling as soon as you add a order."
          title="Order"
        >
          <OpenSheetButton btnLabel={"Orders"} onOpen={() => {}} />
        </NoDataPage>
      )}

      {isOdersSuccess && !!orders.length && (
        <>
          <div className="flex items-center mx-auto container">
            <h1 className="text-lg flex-1 font-semibold md:text-2xl">Orders</h1>
          </div>

          <div className="container mx-auto">
            <DataTable
              searchKey="userInfo"
              columns={OrderColumns}
              data={orders}
              onDelete={async (row) => {
                const ids = row.map((r) => r.original._id);
                await deleteBulkOrders({
                  storeId: storeId!,
                  deleteIds: { ids },
                });
              }}
              disabled={isDisabled}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={pageCount}
              currentPage={pageIndex}
              totalDocs={totalDocs}
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;
