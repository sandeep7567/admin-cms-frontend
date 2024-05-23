import { Form } from "@/components/ui/form";
import { SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import PropertySection from "./PropertySection";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

interface ProductFormProps {
  id?: string;
  onSubmit: (values: FormProductT) => void;
  defaultValues: Pick<
    FormProductT,
    "name" | "archived" | "featured" | "price" | "properties"
  >;
  onDelete?: () => void;
  disabled?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  defaultValues,
  disabled,
  id,
  onDelete,
}) => {
  const form = useForm<FormProductT>({
    resolver: zodResolver(formProductSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormProductT) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <PropertySection />
        <Separator />
        <ImageSection />

        <SheetFooter>
          <Button disabled={disabled} type="submit">
            {id ? "Save changes" : "Create product"}
          </Button>
          {!!id && (
            <Button disabled={disabled} onClick={handleDelete} type="button">
              <Trash className="size-4 mr-2" />
              Delete
            </Button>
          )}
        </SheetFooter>
      </form>
    </Form>
  );
};

export default ProductForm;
