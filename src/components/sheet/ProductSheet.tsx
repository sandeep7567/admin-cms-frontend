import ProductForm from "@/components/form/product-form/ProductForm";
import { useProductMutation } from "@/hooks/product/useProductMutate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ProductFormType } from "@/lib/schema/product-schema";
import { onToggle } from "@/redux/reducer/productSlice";
import { useParams } from "react-router-dom";
import { SheetForm } from "../ui/sheetForm";

const ProductSheet = () => {
  const { mutateProduct, isLoading, isSuccess } = useProductMutation();
  const { isOpen } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { storeId } = useParams();

  const onSubmit = async (formDataJson: ProductFormType) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("price", (formDataJson.price * 100).toString());
    formData.append("archived", formDataJson.archived.toString());
    formData.append("featured", formDataJson.featured.toString());
    formDataJson.properties.forEach((property, index) => {
      formData.append(`properties[${index}][name]`, property.name);
      formData.append(`properties[${index}][value]`, property.value);
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    const { data } = await mutateProduct({
      storeId: String(storeId),
      formData,
    });

    if (data) {
      dispatch(onToggle());
    }

    console.log("response", data);
  };

  return (
    <SheetForm
      title="Create Product"
      description="Make changes to your profile here. Click save when you're done."
      side="product"
      openBtnText="Open"
      open={isOpen}
      onOpen={() => dispatch(onToggle())}
    >
      <ProductForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          price: 0,
          archived: false,
          featured: false,
          properties: [{ name: "", value: "" }],
        }}
        disabled={isLoading}
        onDelete={() => {}}
        isSuccess={isSuccess}
      />
    </SheetForm>
  );
};

export default ProductSheet;
