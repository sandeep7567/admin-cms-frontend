import { OrderColumn, OrderColumns } from "@/components/columns/orderColumns";
import NoDataPage from "@/components/layout/NoDataPage";
import { DataTable } from "@/components/ui/data-table";
import { OpenSheetButton } from "@/components/ui/open-sheet-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOrders } from "@/hooks/order/useFetchOrders";
import { useBulkDeleteOrders } from "@/hooks/order/useBulkDelete";
import { Count } from "@/types";
import { PaginationState } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader } from "lucide-react";
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
    return (
      <div className="relative h-screen w-full flex bg-gray-200/50">
        <NoDataPage description="" info="" title="">
          <Loader
            size={80}
            className="animate-spin flex size-6 items-center text-primary/40 justify-center"
          />
          <h3 className="text-base font-medium text-muted-foreground tracking-tight">
            {isOdersError && "Refresh the page"}
          </h3>
          <Skeleton className="h-8 w-48" />
        </NoDataPage>
      </div>
    );
  }

  const formattedOrders: OrderColumn[] = orders.flatMap((order) =>
    order.productInfo.map((product) => ({
      _id: order?._id,
      name: product.productName,
      qty: product.qty,
      price: product.price / product.qty,
      totalAmount: product.price,
      referenceId: order.orderId,
      status: order.status,
      purchaseAt: format(order.purchaseAt, "dd MMM yyyy"),
    }))
  );

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
              searchKey="name"
              columns={OrderColumns}
              data={formattedOrders}
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
