import {
  ProductColumn,
  ProductColumns,
} from "@/components/columns/productColumns";
import NoDataPage from "@/components/layout/NoDataPage";
import { DataTable } from "@/components/ui/data-table";
import { OpenSheetButton } from "@/components/ui/open-sheet-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteProducts } from "@/hooks/product/useBulkDeleteProducts";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useAppDispatch } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";
import { Count } from "@/types";
import { PaginationState } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { storeId } = useParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Count.ZERO,
    pageSize: Count.PAGE_SIZE,
  });

  const {
    products,
    pageInfo: { pageCount, pageIndex, totalDocs },
    isProductsLoading,
    isProductsFetching,
    isProductsSuccess,
    isProductsError,
  } = useFetchProducts({
    storeId: String(storeId),
    pageIndex: pagination.pageIndex + Count.PAGE_INDEX,
    pageSize: pagination.pageSize,
  });

  const { deleteBulkProducts, isLoading } = useBulkDeleteProducts();

  const isDisabled = isProductsLoading || isLoading;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products.length && pageIndex > 1) {
      console.log("object");
      window.location.href = `/products`;
    }
  }, [pageIndex, products, storeId]);

  if (isProductsLoading || isProductsFetching || isProductsError) {
    return (
      <div className="relative h-screen w-full flex bg-gray-200/50">
        <NoDataPage description="" info="" title="">
          <Loader
            size={80}
            className="animate-spin flex size-6 items-center text-primary/40 justify-center"
          />
          <h3 className="text-base font-medium text-muted-foreground tracking-tight">
            {isProductsError && "Refresh the page"}
          </h3>
          <Skeleton className="h-8 w-48" />
        </NoDataPage>
      </div>
    );
  }

  const formattedProducts: ProductColumn[] = products.length
    ? products?.map((item) => ({
        ...item,
        _id: item._id,
        name: item.name,
        featured: item.featured,
        archived: item.archived,
        price: item.price / 100,
        imageFile: item.imageFile,
        createdAt: format(item.createdAt, "dd MMM yyyy"),
      }))
    : [];

  return (
    <>
      {isProductsSuccess && !products.length && (
        <NoDataPage
          description="You have no products"
          info="You can start selling as soon as you add a product."
          title="Product"
        >
          <OpenSheetButton
            btnLabel={"Create Product"}
            onOpen={() => dispatch(onToggle())}
          />
        </NoDataPage>
      )}

      {isProductsSuccess && !!products.length && (
        <>
          <div className="flex items-center mx-auto container">
            <h1 className="text-lg flex-1 font-semibold md:text-2xl">
              Product
            </h1>
            <OpenSheetButton
              btnLabel={"Create Product"}
              onOpen={() => dispatch(onToggle())}
            />
          </div>

          <div className="container mx-auto">
            <DataTable
              searchKey="name"
              columns={ProductColumns}
              data={formattedProducts}
              onDelete={async (row) => {
                const ids = row.map((r) => r.original._id);
                await deleteBulkProducts({
                  storeId: storeId!,
                  deleteIds: { ids },
                });
              }}
              pagination={pagination}
              setPagination={setPagination}
              disabled={isDisabled}
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

export default ProductPage;
