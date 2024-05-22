import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { onToggle } from "@/redux/reducer/productSlice";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { SheetFooter } from "../ui/sheet";
import { SheetForm } from "../ui/sheetForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "../form/product-form/DetailSection";
import { Separator } from "@/components/ui/separator";
import PropertySection from "../form/product-form/PropertySection";
import ImageSection from "../form/product-form/ImageSection";

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

type formProductT = z.infer<typeof formProductSchema>;

const ProductSheet = () => {
  const { isOpen } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const form = useForm<formProductT>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      archived: false,
      featured: false,
      properties: [{ name: "", value: "" }],
    },
  });

  // 2. Define a submit handler.
  const onProductSubmit = (formDataJson: formProductT) => {
    // TODO: Convert formDataJson to a new FormData object
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("price", (formDataJson.price * 100).toString());
    formData.append("archived", formDataJson.archived.toString());
    formData.append("featured", formDataJson.featured.toString());
    formDataJson.properties.forEach((property, index) => {
      formData.append(`properties[${index}][name]`, property.name.toString());
      formData.append(`properties[${index}][value]`, property.value.toString());
    });

    formData.append("imageFile", formDataJson.imageFile);

    console.log(formDataJson);
    // await register(values);
    // if (isRegisterSuccesss) {
    //   toast("Product created Success");
    //   // close sheet
    // }
    form.reset();
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onProductSubmit)}
          className="space-y-8 rounded-lg"
        >
          <DetailSection />
          <Separator />
          <PropertySection />
          <Separator />
          <ImageSection />

          <SheetFooter>
            <Button disabled={true} type="submit">
              Save changes
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetForm>
  );
};

export default ProductSheet;
