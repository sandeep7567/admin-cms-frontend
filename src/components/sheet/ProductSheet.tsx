import ProductForm from "@/components/form/product-form/ProductForm";
import { useProductMutation } from "@/hooks/product/useProductMutate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ProductFormType } from "@/lib/schema/product-schema";
import { onEditToggle, onToggle } from "@/redux/reducer/productSlice";
import { useParams } from "react-router-dom";
import { SheetForm } from "../ui/sheetForm";
import { useFetchProduct } from "@/hooks/product/useFetchProduct";
import NoDataPage from "../layout/NoDataPage";
import { Loader } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const ProductSheet = () => {
  const { isOpen, id } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { mutateProduct, isLoading, isSuccess } = useProductMutation();
  const {
    isProductError,
    isProductFetching,
    isProductLoading,
    isProductSuccess,
    product,
  } = useFetchProduct(id);

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

  if (
    isProductFetching ||
    isProductLoading ||
    (typeof id !== "undefined" && id !== product?._id)
  ) {
    return (
      <div className="relative h-screen w-full flex bg-gray-200/50">
        <NoDataPage description="" info="" title="">
          <Loader
            size={80}
            className="animate-spin flex size-6 items-center text-primary/40 justify-center"
          />
          <h3 className="text-base font-medium text-muted-foreground tracking-tight">
            {isProductError && "Refresh the page"}
          </h3>
          <Skeleton className="h-8 w-48" />
        </NoDataPage>
      </div>
    );
  }

  const defaultValues =
    isProductSuccess && product && id === product?._id
      ? {
          name: product?.name,
          price: product?.price / 100,
          archived: product?.archived,
          featured: product?.featured,
          properties: product?.properties?.map((prop) => ({
            name: prop?.name,
            value: Array.isArray(prop.value)
              ? prop.value.join(",")
              : prop.value,
          })),
        }
      : {
          name: "",
          price: 0,
          archived: false,
          featured: false,
          properties: [{ name: "", value: "" }],
        };

  return (
    <SheetForm
      title={id ? "Edit Product" : "Create Product"}
      description={
        id
          ? "Edit a existing Product"
          : "Create a new Product to sell on the store"
      }
      side="product"
      openBtnText="Open"
      open={isOpen}
      onOpen={() => dispatch(id ? onEditToggle({ id: undefined }) : onToggle())}
    >
      {isProductLoading && id !== product?._id ? (
        <div className="relative h-screen w-full flex bg-gray-200/50">
          <NoDataPage>
            <Loader
              size={80}
              className="animate-spin flex size-6 items-center text-primary/40 justify-center"
            />
            <h3 className="text-base font-medium text-muted-foreground tracking-tight">
              {isProductError && "Refresh the page"}
            </h3>
            <Skeleton className="h-8 w-48" />
          </NoDataPage>
        </div>
      ) : (
        <ProductForm
          id={id}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          disabled={isLoading}
          onDelete={() => {}}
          isSuccess={isSuccess}
        />
      )}
    </SheetForm>
  );
};

export default ProductSheet;
