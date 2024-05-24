import {
  ProductColumn,
  ProductColumns,
} from "@/components/columns/productColumns";
import NoDataPage from "@/components/layout/NoDataPage";
import { DataTable } from "@/components/ui/data-table";
import { OpenSheetButton } from "@/components/ui/open-sheet-button";
import { useFetchProducts } from "@/hooks/product/useFetchProducts";
import { useAppDispatch } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const ProductPage = () => {
  const { storeId } = useParams();
  const { products, isProductsLoading, isProductsFetching, isProductsSuccess } =
    useFetchProducts({
      storeId: String(storeId),
    });

  const dispatch = useAppDispatch();

  if (isProductsLoading || isProductsFetching) {
    return (
      <div className="relative h-screen w-full flex bg-gray-200/50">
        <NoDataPage description="" info="" title="">
          <Loader
            size={80}
            className="animate-spin flex items-center text-primary/40 justify-center"
          />
        </NoDataPage>
      </div>
    );
  }

  const formattedProducts: ProductColumn[] = products.length
    ? products?.map((item) => ({
        _id: item._id,
        name: item.name,
        featured: item.featured,
        archived: item.archived,
        price: item.price / 100,
        // category: item.category.name,
        // size: item.size.name,
        // color: item.color.value,
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
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
