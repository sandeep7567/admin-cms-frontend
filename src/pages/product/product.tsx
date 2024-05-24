import { ProductColumns } from "@/components/columns/productColumns";
import NoDataPage from "@/components/layout/NoDataPage";
import { DataTable } from "@/components/ui/data-table";
import { OpenSheetButton } from "@/components/ui/open-sheet-button";
import { useAppDispatch } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";

const ProductPage = () => {
  const products = [
    {
      _id: "dcdcvfdv",
      email: "dcdcvfdv@gmail.com",
      image: "string",
      firstName: "Sandeep",
      lastName: "Thakur",
      price: "10000",
      isFeatured: true,
      isArchived: false,
      createdAt: "01-02-2024",
    },
    {
      _id: "dcd4dv",
      email: "dcdcvfdv@gmail.com",
      image: "string",
      firstName: "Sandeep",
      lastName: "Thakur",
      price: "10000",
      isFeatured: true,
      isArchived: false,
      createdAt: "01-02-2024",
    },
    {
      _id: "dc444dv",
      email: "dcdcvfdv@gmail.com",
      image: "string",
      firstName: "Sandeep",
      lastName: "Thakur",
      price: "10000",
      isFeatured: true,
      isArchived: false,
      createdAt: "01-02-2024",
    },
    {
      _id: "dcvfdv",
      email: "dcdcvfdv@gmail.com",
      image: "string",
      firstName: "Sandeep",
      lastName: "Thakur",
      price: "10000",
      isFeatured: true,
      isArchived: false,
      createdAt: "01-02-2024",
    },
  ];
  const dispatch = useAppDispatch();
  return (
    <>
      {!products.length && (
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

      {!!products.length && (
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
              searchKey="email"
              columns={ProductColumns}
              data={products}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
