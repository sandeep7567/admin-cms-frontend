import NoDataPage from "@/components/layout/NoDataPage";
import ProductSheet from "@/components/sheet/ProductSheet";

const ProductPage = () => {
  return (
    <>
      <ProductSheet />
      <NoDataPage
        btnLabel="Create Product"
        description="You have no products"
        info="You can start selling as soon as you add a product."
        title="Product"
      />
    </>
  );
};

export default ProductPage;
