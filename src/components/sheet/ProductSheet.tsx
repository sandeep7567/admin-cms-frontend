import ProductForm from "@/components/form/product-form/ProductForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { SheetForm } from "../ui/sheetForm";
import { useProductMutation } from "@/hooks/product/useProductMutate";

const formProductSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive()
    .gte(0),
  featured: z.boolean().default(false),
  archived: z.boolean().default(false),
  properties: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      value: z.string().min(1, "value is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

type FormProductT = z.infer<typeof formProductSchema>;

const ProductSheet = () => {
  const { mutateProduct } = useProductMutation();
  const { isOpen } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { storeId } = useParams();

  // 2. Define a submit handler.
  const onSubmit = async (formDataJson: FormProductT) => {
    // TODO: Convert formDataJson to a new FormData object
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

    await mutateProduct({
      storeId: String(storeId),
      formData,
    });

    console.log("formData", formData);
    // await register(values);
    // if (isRegisterSuccesss) {
    //   toast("Product created Success");
    //   // close sheet
    // }
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
        disabled={false}
        onDelete={() => {}}
      />
    </SheetForm>
  );
};

export default ProductSheet;
