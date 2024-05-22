import NoDataPage from "@/components/layout/NoDataPage";
import { OpenSheetButton } from "@/components/ui/open-sheet-button";
import { useAppDispatch } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  return (
    <>
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
    </>
  );
};

export default ProductPage;
