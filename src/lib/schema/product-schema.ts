import { z } from "zod";

export const productFormSchema = z.object({
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

export type ProductFormType = z.infer<typeof productFormSchema>;
