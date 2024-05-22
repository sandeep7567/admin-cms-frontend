import { StoreModal } from "@/components/modals/StoreModal";
import ProductSheet from "@/components/sheet/ProductSheet";

const ModalProvider = () => {
  return (
    <>
      <ProductSheet />
      <StoreModal />
    </>
  );
};

export default ModalProvider;
